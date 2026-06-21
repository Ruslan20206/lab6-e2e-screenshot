const calculateTax = require('../src/tax');

test('Розрахунок податку для валідних значень', () => {
    expect(calculateTax(100, 20)).toBe(20);        // 20% від 100 = 20
    expect(calculateTax(250, 5)).toBe(12.5);       // 5% від 250 = 12.5
    expect(calculateTax(50, 0)).toBe(0);           // 0% від 50 = 0
});

test('Викидання помилок при негативній сумі або ставці податку', () => {
    expect(() => calculateTax(-50, 20)).toThrow('Сума не може бути негативною');
    expect(() => calculateTax(100, -10)).toThrow('Ставка податку не може бути негативною');
});
