console.log(window.innerWidth);

let soloWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 270;

window.addEventListener('resize', () => {
  soloWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 270;
  solo = {
    ...solo,
    width: soloWidth,
  };
});

export const all = {
  height: 300,
  width: 300,
};

export let solo = {
  height: 600,
  width: soloWidth,
};
