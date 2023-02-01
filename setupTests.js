import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';

global.ResizeObserver = require('resize-observer-polyfill')

// global.ResizeObserver = jest.fn().mockImplementation(() => ({
//     observe: jest.fn(),
//     unobserve: jest.fn(),
//     disconnect: jest.fn(),
// }))