console.log(window.innerWidth);

let soloWidth;

window.addEventListener('resize', () => {
  soloWidth = window.innerWidth > 800 ? 800 : window.innerWidth;
  console.log('innerWidth', soloWidth);
});

export const all = {
  height: 300,
  width: 300,
};

export const solo = {
  height: 600,
  width: soloWidth,
};
