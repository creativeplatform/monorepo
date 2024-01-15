export const removeUnderScore = (str: string) => {
    if (!str.includes('_')) {
      return str.toUpperCase()
    } else {
      return str.split('_').join(' ').toUpperCase()
    }
}

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}