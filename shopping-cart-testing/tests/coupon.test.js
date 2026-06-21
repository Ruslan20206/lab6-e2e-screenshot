const validateCoupon = require('../src/coupon');

test('Перевірка валідності відомих промокодів', () => {
    expect(validateCoupon('SAVE10')).toBe(10);
    expect(validateCoupon('WELCOME5')).toBe(5);
    expect(validateCoupon('SUPER30')).toBe(30);
});

test('Перевірка регістронезалежності та обрізання пробілів', () => {
    expect(validateCoupon('  save10  ')).toBe(10);
    expect(validateCoupon('Welcome5')).toBe(5);
});

test('Повернення 0 для невалідних або відсутніх купонів', () => {
    expect(validateCoupon('INVALID')).toBe(0);
    expect(validateCoupon(null)).toBe(0);
    expect(validateCoupon(undefined)).toBe(0);
});
