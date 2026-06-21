const applyDiscount = require('../src/discount');

test('Застосування коректної знижки', () => {
    expect(applyDiscount(100, 10)).toBe(90);      // 100 - 10% = 90
    expect(applyDiscount(250, 20)).toBe(200);      // 250 - 20% = 200
    expect(applyDiscount(50, 0)).toBe(50);         // 50 - 0% = 50
    expect(applyDiscount(80, 100)).toBe(0);        // 80 - 100% = 0
});

test('Викидання помилок при некоректній ціні чи відсотку знижки', () => {
    expect(() => applyDiscount(-100, 10)).toThrow('Ціна не може бути негативною');
    expect(() => applyDiscount(100, -5)).toThrow('Відсоток знижки має бути в межах від 0 до 100');
    expect(() => applyDiscount(100, 105)).toThrow('Відсоток знижки має бути в межах від 0 до 100');
});
