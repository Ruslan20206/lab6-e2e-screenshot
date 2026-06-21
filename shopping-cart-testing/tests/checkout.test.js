const processCheckout = require('../src/checkout');
const axios = require('axios');

jest.mock('axios');

describe('Інтеграційний тест: Оформлення замовлення (checkout)', () => {
    let mockCart = {};

    beforeEach(() => {
        mockCart = {
            items: [
                { name: 'Книга', price: 200, quantity: 2 }, // Subtotal: 400
                { name: 'Блокнот', price: 100, quantity: 1 } // Subtotal: 100
            ], // Total subtotal: 500
            couponCode: 'WELCOME5', // 5% discount -> 500 - 5% = 475
            taxRate: 10 // 10% tax of 475 = 47.5 -> Total: 522.5
        };
        jest.clearAllMocks();
    });

    test('Успішне оформлення замовлення з відправкою запиту на API', async () => {
        const mockApiResponse = {
            data: {
                id: 12345
            }
        };
        axios.post.mockResolvedValue(mockApiResponse);

        const email = 'user@example.com';
        const result = await processCheckout(mockCart, email);

        // Перевіряємо виклик axios.post
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts',
            expect.objectContaining({
                email: email,
                orderItems: mockCart.items,
                totals: {
                    subtotal: 500,
                    discountPercent: 5,
                    discountAmount: 25,
                    taxAmount: 47.5,
                    total: 522.5
                }
            })
        );

        // Перевіряємо результат функції
        expect(result).toEqual({
            success: true,
            orderId: 12345,
            order: expect.objectContaining({
                email: email,
                orderItems: mockCart.items,
                totals: {
                    subtotal: 500,
                    discountPercent: 5,
                    discountAmount: 25,
                    taxAmount: 47.5,
                    total: 522.5
                }
            })
        });
    });

    test('Викидання помилки при порожньому кошику', async () => {
        const emptyCart = { items: [] };
        await expect(processCheckout(emptyCart, 'user@example.com'))
            .rejects.toThrow('Кошик не може бути порожнім');
        expect(axios.post).not.toHaveBeenCalled();
    });

    test('Викидання помилки при некоректному email', async () => {
        await expect(processCheckout(mockCart, 'invalid-email'))
            .rejects.toThrow('Некоректний email користувача');
        expect(axios.post).not.toHaveBeenCalled();
    });
});
