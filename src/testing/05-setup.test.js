/** *
 * Describe()
 * conjunto de pruebas
 * Permite agrupar pruebas o casos de pruebas
 * Si necesitamos correr algo antes de nuestros casos de pruebas
 * dentro de nuetro describe podemos usar beforeAll() aveces es iniciar
 *  base de datos(hooks)
 *si necesitamos correr algo despues de nuestros casos de pruebas
 * dentro de nuetro describe podemos usar afterAll() aveces es una apagar
 * o desmontar base de datos
 *
 *
 */

/**
 *beforeAll(): se ejecuta antes de todas las pruebas.
 *beforeEach(): se ejecuta antes de cada prueba.
 *afterEach(): se ejecuta después de cada prueba.
 *afterAll(): se ejecuta después de todas las pruebas
 *Nota: Todas estas funciones se ejecutan dentro del alcance del scope.
 */

describe('Set 1', () => {
  beforeAll(() => {
    console.log('Before All');
  });

  afterAll(() => {
    console.log('After All');
  });

  beforeEach(() => {
    console.log('Before Each');
  });

  afterEach(() => {
    console.log('After Each');
  });
  test('case 1', () => {
    console.log('Case 1');
    expect(1 + 1).toBe(2);
  });
  test('case 2', () => {
    console.log('Case 2');
    expect(1 + 2).toBe(3);
  });
});

describe('Set 2', () => {
  beforeAll(() => {
    console.log('Before All 2');
  });

  afterAll(() => {
    console.log('After All 2');
  });
  test('case 3', () => {
    console.log('Case 1');
    expect(1 + 1).toBe(2);
  });
  test('case 4', () => {
    console.log('Case 2');
    expect(1 + 2).toBe(3);
  });
});
