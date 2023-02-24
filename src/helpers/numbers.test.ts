import { getRandomInt, parseToNumber } from './numbers';

test('should parse string to number (person mass value perhaps)', () => {
  const testData = '100';
  const result = parseToNumber(testData);

  expect(result).toEqual(100);
});

test('should get random int between two numbers', () => {
  const result = getRandomInt(1, 10);

  expect(result).toBeGreaterThanOrEqual(1);
  expect(result).toBeLessThanOrEqual(10);
});
