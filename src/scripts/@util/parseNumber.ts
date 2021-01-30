export function parseNumber(str: string): number | undefined {
  const num = Number.parseFloat(str)
  return isNaN(num) ? undefined : num
}
