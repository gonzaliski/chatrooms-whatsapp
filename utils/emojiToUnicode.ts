export const getEmojiUnicode = (emoji: string): string => {
  const code = [...emoji]
    .map((x) => x.codePointAt(0) ?? 0)
    .filter((n) => n > 0xfff || n === 0x200d || (0xfe00 <= n && n <= 0xfeff))
    .map((x) => x.toString(16))
    .join(`-`);
  return code;
};
