import 'jest-preset-angular';

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: jest.fn(),
      includes: jest.fn(),
    },
    assign: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'alert', {
  value: {
    hash: {
      endsWith: jest.fn(),
      includes: jest.fn(),
    },
    assign: jest.fn(),
  },
  writable: true,
});
