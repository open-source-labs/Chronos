export default function extractWord(str, start, end) {
  const result = [];
  let startIndex = 0;
  let endIndex = 0;
  let index1 = str.indexOf(start, startIndex);
  let index2 = str.indexOf(end, endIndex);
  while (index1 > -1 && index2 > -1) {
    if (index2 > index1) {
      let substr = str.substring(index1, index2).trim();
      substr = substr.slice(7);
      const left = substr.split(' ')[2];
      const right = Number(substr.split(' ')[3]);
      const obj = {};
      obj[left] = right;
      result.push(obj);
      startIndex = index1 + start.length;
      endIndex = index2 + end.length;
    } else {
      endIndex = index2 + end.length;
    }
    index1 = str.indexOf(start, startIndex);
    index2 = str.indexOf(end, endIndex);
  }
  return result;
}
