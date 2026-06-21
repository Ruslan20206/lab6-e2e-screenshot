const calculateCartTotal = require('../src/cart');

describe('Інтеграційний тест: Розрахунок кошика', () => {
    const mockItems = [
        { name: 'Ноутбук', price: 1000, quantity: 1 },
        { name: 'Мишка', price: 50, quantity: 2 }
    ]; // Subtotal: 1000*1 + 50*2 = 1100

    test('Розрахунок без купона та без податку', () => {
        const result = calculateCartTotal(mockItems);
        expect(result).toEqual({
            subtotal: 1100,
            discountPercent: 0,
            discountAmount: 0,
            taxAmount: 0,
            total: 1100
        });
    });

    test('Розрахунок з купоном SAVE10 (10%) та податком ПДВ (20%)', () => {
        // 1. Subtotal = 1100
        // 2. Купон SAVE10 дає 10% знижки
        // 3. Discounted total = 1100 - 10% = 990
        // 4. Податок 20% від 990 = 198
        // 5. Total = 990 + 198 = 1188
        const result = calculateCartTotal(mockItems, 'SAVE10', 20);
        expect(result).toEqual({
            subtotal: 1100,
            discountPercent: 10,
            discountAmount: 110,
            taxAmount: 198,
            total: 1188
        });
    });

    test('Розрахунок з невалідним купоном та податком', () => {
        // Знижка = 0%
        // Total = 1100 + 20% = 1100 + 220 = 1320
        const result = calculateCartTotal(mockItems, 'INVALID_CODE', 20);
        expect(result).toEqual({
            subtotal: 1100,
            discountPercent: 0,
            discountAmount: 0,
            taxAmount: 220,
            total: 1320
        });
    });

    test('Помилка при некоректних даних товарів', () => {
        const invalidItems = [
            { name: 'Товар 1', price: -50, quantity: 1 }
        ];
        expect(() => calculateCartTotal(invalidItems)).toThrow('Ціна та кількість товару не можуть бути негативними');
    });
});
