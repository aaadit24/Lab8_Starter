const functions = require('../code-to-unit-test/unit-test-me.js');

describe('isPhoneNumber', () => {
  test('should return true for valid phone number', () => {
    expect(functions.isPhoneNumber('(123) 456-7890')).toBe(true);
  });

  test('true for valid phone number ', () => {
    expect(functions.isPhoneNumber('123-456-7890')).toBe(true);
  });

  test('false for invalid phone number', () => {
    expect(functions.isPhoneNumber('1234567890')).toBe(false);
  });

  test('false for invalid phone number', () => {
    expect(functions.isPhoneNumber('abcde')).toBe(false);
  });
});

describe('isEmail', () => {
  test('should return true for valid email format', () => {
    expect(functions.isEmail('test@example.com')).toBe(true);
  });

  test('should return true for valid email format', () => {
    expect(functions.isEmail('user_name123@test.co')).toBe(true);
  });

  test('should return false for invalid email format', () => {
    expect(functions.isEmail('abc@')).toBe(false);
  });

  test('should return false for invalid email format', () => {
    expect(functions.isEmail('abc')).toBe(false);
  });
});

describe('isStrongPassword', () => {
  test('it should return true for strong passwords', () => {
    expect(functions.isStrongPassword('Helloabc1_')).toBe(true);
  });

  test(' it should return true for strong passwords', () => {
    expect(functions.isStrongPassword('Password123')).toBe(true);
  });

  test('it should return false for weak passwords', () => {
    expect(functions.isStrongPassword('abc')).toBe(false);
  });

  test('it should return false for weak passwords', () => {
    expect(functions.isStrongPassword('@')).toBe(false);
  });
});

describe('isDate', () => {
  test('should return true for valid date format', () => {
    expect(functions.isDate('11/19/2022')).toBe(true);
  });

  test('should return true for valid date format', () => {
    expect(functions.isDate('07/07/2023')).toBe(true);
  });

  test('return false for invalid format', () => {
    expect(functions.isDate('31123/12/2022')).toBe(false);
  });

  test('should return false for invalid date format', () => {
    expect(functions.isDate('20///22//////31')).toBe(false);
  });
});

describe('isHexColor', () => {
  test('It should return true for valid color codes', () => {
    expect(functions.isHexColor('#FFF')).toBe(true);
  });

  test('should return true for valid hex color codes', () => {
    expect(functions.isHexColor('#FF00FF')).toBe(true);
  });

  test('should return false for invalid hex color codes', () => {
    expect(functions.isHexColor('#GHI')).toBe(false);
  });

  test('return false for invalid hex color codes', () => {
    expect(functions.isHexColor('#FF00FF00')).toBe(false);
  });
});
