

export const stringToColor = (string: string, recurses = 0) => {
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

    // console.log(colour);
    return colour;
  }
};
