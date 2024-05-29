// npm i -D @types/jest
/**
 * Testtin Object
 * use by object
 * - toEqual()
 *  No use :
 * - toBe()
 */

test('testing object', () => {
  const data = { name: 'Thom' };
  data.lastname = 'Brown';
  expect(data).toEqual({ name: 'Thom', lastname: 'Brown' });
});

/**
 * data is defined with null then data is :
 * - toBeNull()
 * - toBeDefined()
 * - not.toBeUndefined()
 *  Add not() to reverse the expect result
 */
test('when values is null', () => {
  const data = null;
  expect(data).toBeNull();
  expect(data).toBeDefined();
  expect(data).not.toBeUndefined();
});

/**
 * Testing Bolean
 * - toEqual()
 *  Use toBeTruthy() and toBeFalsy():
 * when value is in function IF
 *
 */
test('when values is null', () => {
  expect(true).toEqual(true);
  expect(false).toEqual(false);

  expect(0).toBeFalsy();
  expect('').toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(false).toBeFalsy();
});

/**
 * String
 * use by string
 * - toMatch(/string/)
 */

test('Testtin string', () => {
  expect('Thom').toMatch(/om/);
});

/**
 * Testing Array
 * - toContain()
 */

const nameList = ['Thom', 'Brown', 'Roka'];

test('testing array', () => {
  expect(nameList).toContain('Thom');
});

/**
 * Exceptiones
 * use
 * toThrow()
 */

function compileAndroideCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroideCode()).toThrow();
  expect(() => compileAndroideCode()).toThrow(Error);
});
