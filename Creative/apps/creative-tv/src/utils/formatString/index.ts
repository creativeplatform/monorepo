export const removeUnderScore = (str: string) => {
  if (!str.includes('_')) {
    return str.toUpperCase()
  } else {
    return str.split('_').join(' ').toUpperCase()
  }
}

export function titleCase(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
