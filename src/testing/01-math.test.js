import { multiply, sum, divide, average } from './02-math';

describe('Testing Math', () => {
  describe('sum', () => {
    test('adds 1 +3 should be 4', () => {
      const rta = sum(1, 3);
      expect(rta).toBe(4);
    });
  });

  describe('multiply', () => {
    test('multiply 4 * 1 should be 4', () => {
      const rta = multiply(4, 1);
      expect(rta).toBe(4);
    });
  });
  describe('divide', () => {
    test('divide A / B should be C correctly', () => {
      const rta = divide(6, 2);
      expect(rta).toBe(3);

      const rta2 = divide(5, 2);
      expect(rta2).toBe(2.5);
    });
    test('divide by Zero', () => {
      const rta = divide(6, 0);
      expect(rta).toBeNull();

      const rta2 = divide(5, 0);
      expect(rta2).toBeNull();
    });
  });
  describe('average', () => {
    test('average grades 3, 4 and 5 should be 4 ', () => {
      const rta = average(3, 4, 5);
      expect(rta).toBe(4);
    });
  });
});
