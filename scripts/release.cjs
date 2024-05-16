/**
 * 版本发布
 * 可通过命令行指定版本号 pnpm release 1.2.3
 * 命令行可选项
 * --preid 指定先行版本号
 * --tag 指定 npm tag
 * --dry 空跑，只执行修改版本号
 */
const args = require('minimist')(process.argv.slice(2))
const semver = require('semver')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const execa = require('execa')
const path = require('path')
const fs = require('fs')
const currentVersion = require('../package.json').version
const pkgPath = path.resolve(__dirname, '../package.json')

const inc = (type) => semver.inc(currentVersion, type, preId)
const step = (msg) => console.log(chalk.cyan(msg))
const isDryRun = args.dry
const run = (bin, args, opts = {}) => {
  return execa(bin, args, { stdio: 'inherit', ...opts })
}
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run
// 获取先行版本号 id
const preId =
  args.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
// 版本号类型选项，作为未指定版本号时提供的选项
const versionIncTypes = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
]

async function main() {
  step('\n确定版本号')
  let targetVersion = args._[0]
  if (!targetVersion) {
    // 选择
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: '选择要发布的版本',
      choices: versionIncTypes.map((type) => `${type} (${inc(type)})`).concat('custom')
    })
    // 自定义输入
    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: '输入要发布的版本号'
        })
      ).version
    } else {
      targetVersion = release.match(/\((.+)\)/)[1]
    }
  }
  if (!semver.valid(targetVersion)) {
    throw new Error(chalk.red(`版本号 ${targetVersion} 不符合 semver 规范，请重新输入！`))
  }
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `确定发布的版本为 v${targetVersion}?`
  })
  if (!yes) {
    return
  }

  step('\n更新 package.json 文件版本号')
  updatePkgVersion(targetVersion)

  step('\n运行打包命令')
  await runIfNotDry('pnpm', ['run', 'build'])

  step('\n生成changelog')
  await runIfNotDry('pnpm', ['run', 'changelog'])

  // update pnpm-lock.yaml
  step('\\nUpdating lockfile...')
  await run(`pnpm`, ['install', '--prefer-offline'])

  step('\ngit 提交代码')
  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    // git add -A
    await runIfNotDry('git', ['add', '-A'])
    // git commit -m "release: vxxx"
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('git 没有可提交内容')
  }

  step('\n发布新版本包到 npm')
  await publishPackage(targetVersion)

  step('\n创建 tag & 代码 push 到 github 仓库')
  await runIfNotDry('git', ['tag', `v${targetVersion}`])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await runIfNotDry('git', ['push'])

  step('\n 完成🍗🍗🍗')
}

function updatePkgVersion(version) {
  const pkgStr = fs.readFileSync(pkgPath, { encoding: 'utf-8' })
  const pkg = JSON.parse(pkgStr)
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

async function publishPackage(version) {
  let releaseTag = null
  if (args.tag) {
    releaseTag = args.tag
  } else if (version.includes('alpha')) {
    releaseTag = 'alpha'
  } else if (version.includes('beta')) {
    releaseTag = 'beta'
  } else if (version.includes('rc')) {
    releaseTag = 'rc'
  }
  const pkgRoot = path.resolve(__dirname, '../')
  // note: use of yarn is intentional here as we rely on its publishing behavior.
  await runIfNotDry(
    'yarn',
    [
      'publish',
      '--new-version',
      version,
      ...(releaseTag ? ['--tag', releaseTag] : []),
      '--access',
      'public',
      '--registry',
      'https://registry.npmjs.org/'
    ],
    {
      cwd: pkgRoot,
      // stdio: 'pipe'
    }
  )
}

main().catch((err) => {
  console.log(err)
})
