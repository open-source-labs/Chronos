// Mock window environment
window.require = require;

// Mock import statements for Plotly
window.URL.createObjectURL = () => {};

// Mock get context
HTMLCanvasElement.prototype.getContext = () => {};
