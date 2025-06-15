export const normalizeText = (text?: string) => text ? text.replaceAll("<br>", "")
  .replaceAll(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold">$1</span>')
  .replaceAll(/\[c (.*?)\]/g, "$1°C")
  .replaceAll(
    /\[f (.*?)\]/g,
    (match, p1) => `${((parseFloat(p1) - 32) * (5 / 9)).toFixed(1)}°C`
  )
  .replaceAll(/\*(.*?)\*/g, '<span style="font-weight: bold">$1</span>')
  .replaceAll(/\[link ([^\s]+) (.*?)\]/g, '<a href="$1">$2</a>') : '';
