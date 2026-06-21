/**
 * Валідує купон та повертає відсоток знижки.
 * @param {string} code - Промокод купона.
 * @returns {number} - Відсоток знижки (наприклад, 10 для 10%). Повертає 0, якщо купон не знайдено.
 */
function validateCoupon(code) {
    if (typeof code !== 'string') {
        return 0;
    }
    const coupons = {
        'SAVE10': 10,
        'WELCOME5': 5,
        'SUPER30': 30
    };
    const cleanedCode = code.trim().toUpperCase();
    return coupons[cleanedCode] || 0;
}

module.exports = validateCoupon;
