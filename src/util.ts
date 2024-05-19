export function addUrlQueryParams(
  url: string,
  params: Record<string, any>,
  skipNullOrUndefined = true
): string {
  const urlObj = new URL(url)
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (!skipNullOrUndefined || (value !== null && value !== undefined)) {
      urlObj.searchParams.append(key, value)
    }
  })
  return urlObj.toString()
}

const pureNumberRegex = /^(\d|\.)+$/
export function formatLength<T extends number | string | null | undefined | any>(
  value: unknown,
  suffix = 'px'
): T extends null
  ? null
  : T extends undefined
  ? undefined
  : T extends string | number
  ? string
  : T {
  if (typeof value === 'number') {
    return `${value}${suffix}` as any
  } else if (typeof value === 'string') {
    if (pureNumberRegex.test(value)) {
      return `${value}${suffix}` as any
    }
  }
  return value as any
}
