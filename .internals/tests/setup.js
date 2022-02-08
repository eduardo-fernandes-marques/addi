require("jest-localstorage-mock");
require("@testing-library/jest-dom");


const envRef = { ...process.env };
delete process.env;
process.env = { ...envRef };

const locationRef = { ...window.location };
delete window.location;
window.location = { ...locationRef };

window.MutationObserver = require("@sheerun/mutationobserver-shim");
window.IntersectionObserver = jest.fn(function () {
  this.observe = jest.fn();
  this.disconnect = jest.fn();
});


beforeEach(() => {
  jest.restoreAllMocks();
  process.env = { ...envRef };
  console.warn = jest.fn();
  console.error = jest.fn();
  window.location = { ...locationRef };
});
