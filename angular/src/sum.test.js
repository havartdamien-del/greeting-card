const sum = require('./sum');

test('addition simple', () => {
  expect(sum(1, 2)).toBe(3);
});