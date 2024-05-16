export function genURLQueryString(obj: { [k: string]: any }, skipNullOrUndefined = true): string {
  const params = new URLSearchParams()
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key]
      if (!skipNullOrUndefined || (value !== null && value !== undefined)) {
        params.append(key, value)
      }
    }
  }
  return params.toString()
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
