const applyDiscount = require('./discount');
const calculateTax = require('./tax');
const validateCoupon = require('./coupon');

/**
 * Розраховує повну вартість кошика покупця.
 * Інтегрує модулі coupon, discount та tax для обчислення фінального результату.
 * 
 * @param {Array<Object>} items - Масив товарів, наприклад [{ name: 'Книга', price: 200, quantity: 2 }]
 * @param {string} [couponCode] - Промокод для знижки.
 * @param {number} [taxRate=0] - Ставка податку у відсотках.
 * @returns {Object} - Об'єкт із розрахованими сумами.
 */
function calculateCartTotal(items, couponCode = null, taxRate = 0) {
    if (!Array.isArray(items)) {
        throw new Error('Товари мають бути передані у вигляді масиву');
    }

    // 1. Рахуємо проміжний підсумок
    const subtotal = items.reduce((sum, item) => {
        const price = item.price || 0;
        const qty = item.quantity || 0;
        if (price < 0 || qty < 0) {
            throw new Error('Ціна та кількість товару не можуть бути негативними');
        }
        return sum + (price * qty);
    }, 0);

    // 2. Валідуємо купон та визначаємо відсоток знижки
    const discountPercent = couponCode ? validateCoupon(couponCode) : 0;

    // 3. Застосовуємо знижку
    const discountedTotal = applyDiscount(subtotal, discountPercent);
    const discountAmount = subtotal - discountedTotal;

    // 4. Нараховуємо податок
    const taxAmount = calculateTax(discountedTotal, taxRate);

    // 5. Загальна сума
    const total = discountedTotal + taxAmount;

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountPercent,
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
}

module.exports = calculateCartTotal;
