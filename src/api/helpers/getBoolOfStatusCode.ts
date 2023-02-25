export function getBoolOfStatusCode(status: number) {
  const string = String(status)
  let result = true
  if (string[0] === '4' || string[0] === '5') {
    result = false
  }

  return result
}
