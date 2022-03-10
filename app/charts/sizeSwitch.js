let soloWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 270;

/** From Version 5.2 Team:
 * @solo needs to be mutable, but eslint doesn't like exporting mutable variables
 */

// eslint-disable-next-line import/no-mutable-exports
export let solo = {
  height: 600,
  width: soloWidth,
};

window.addEventListener('resize', () => {
  soloWidth = window.innerWidth > 800 ? 800 : window.innerWidth - 270;
  solo = {
    ...solo,
    width: soloWidth,
  };
});

export const all = {
  height: 400,
  width: 400,
};
