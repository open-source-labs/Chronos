

export const stringToColour = (string: string, recurses = 0) => {
  if (recurses > 20) return string;
  function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += `00${value.toString(16)}`.substring(-2);
    }
    return colour;
  }
  function contrastYiq(color: string) {
    const num = parseInt(color.slice(1), 16);
    const r = (num >>> 16) & 0xff;
    const g = (num >>> 8) & 0xff;
    const b = num & 0xff;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq <= 50 ? stringToColour(color, recurses + 1) : color;
  }
  for (let salt = 0; salt < 5; salt++) string = hashString(string);
  return contrastYiq(string);
};