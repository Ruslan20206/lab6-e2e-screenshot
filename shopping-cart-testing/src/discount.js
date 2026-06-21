/**
 * Застосовує знижку у відсотках до ціни.
 * @param {number} price - Початкова ціна (наприклад, 100).
 * @param {number} discountPercent - Відсоток знижки (від 0 до 100).
 * @returns {number} - Ціна зі знижкою.
 */
function applyDiscount(price, discountPercent) {
    if (price < 0) {
        throw new Error('Ціна не може бути негативною');
    }
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error('Відсоток знижки має бути в межах від 0 до 100');
    }
    return price * (1 - discountPercent / 100);
}

module.exports = applyDiscount;
