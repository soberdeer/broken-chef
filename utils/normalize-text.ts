const fractions = {
  "1/2": "½",
  "1/3": "⅓",
  "2/3": "⅔",
  "1/4": "¼",
  "3/4": "¾",
  "1/5": "⅕",
  "2/5": "⅖",
  "3/5": "⅗",
  "4/5": "⅘",
  "1/6": "⅙",
  "5/6": "⅚",
  "1/7": "⅐",
  "1/8": "⅛",
  "3/8": "⅜",
  "5/8": "⅝",
  "7/8": "⅞",
  "1/9": "⅑",
  "1/10": "⅒",
};

export const normalizeText = (text?: string) =>
  text
    ? text
        .replaceAll("<br>", "")
        .replaceAll(
          /\*\*(.*?)\*\*/g,
          '<span style="font-weight: bold">$1</span>',
        )
        .replaceAll(/\[c (.*?)\]/g, "$1°C")
        .replaceAll(
          /\[f (.*?)\]/g,
          (match, p1) => `${((parseFloat(p1) - 32) * (5 / 9)).toFixed(1)}°C`,
        )
        .replaceAll(/\*(.*?)\*/g, '<span style="font-weight: bold">$1</span>')
        .replaceAll(/\[link ([^\s]+) (.*?)\]/g, '<a href="$1">$2</a>')
    : "";
