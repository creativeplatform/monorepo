export const removeUnderScore = (str: string) => {
  if (!str.includes('_')) {
    return str.toUpperCase()
  } else {
    return str.split('_').join(' ').toUpperCase()
  }
}
