/* istanbul ignore file */
/**
 * Mock window environment
 */
window.require = require;

/**
* Mock import statements for Plotly
*/
window.URL.createObjectURL = () => {};

/**
* Mock getContext
*/
HTMLCanvasElement.prototype.getContext = () => {};
