import Person from './06-person';

describe('Test for person', () => {
  let person;

  // Arrange / Given
  beforeEach(() => {
    person = new Person('Nicolas', 45, 1.7);
  });

  test('should return down', () => {
    // AAA
    // Arrange / Given
    // Act / When
    // Asse/ Then

    // Arrange
    person.weight = 45;
    // Act
    const imc = person.calcIMC();
    // Assert
    expect(imc).toBe('down');
  });

  test('should return normal', () => {
    person.weight = 90;
    const imc = person.calcIMC();
    expect(imc).toBe('overweight level 2');
  });
});

/**
 *
 * si queremos que corra sola un archivo
 * ? npm run test -- 06-person
 * si Queremos ver la cobertura de codigo
 * ? npm run test -- --coverage
 */
