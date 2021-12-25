export const round = (num, precision = 7) =>
  Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)

export const RIGHT = true
export const LEFT = false

// const remainDecl = formDecl([
//   'лишняя плитка', // singular, nom
//   'лишниe плитки', // plural, nom
//   'лишних плиток', // plural, gen
// ])
export const formDecl = (forms) => (num) => {
  const n = num % 10
  if (num < 5 || num > 20) {
    if (n === 1) return forms[0]
    else if (2 <= n && n <= 4) return forms[1]
  }
  return forms[2]
}
