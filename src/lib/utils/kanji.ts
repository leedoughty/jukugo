export const isKanji = (char: string) => /^[\u4e00-\u9faf]$/.test(char);
