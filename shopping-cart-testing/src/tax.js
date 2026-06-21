/**
 * Розраховує суму податку для вказаної суми та ставки.
 * @param {number} amount - Сума, на яку нараховується податок.
 * @param {number} taxRate - Ставка податку у відсотках (наприклад, 20 для 20%).
 * @returns {number} - Сума податку.
 */
function calculateTax(amount, taxRate) {
    if (amount < 0) {
        throw new Error('Сума не може бути негативною');
    }
    if (taxRate < 0) {
        throw new Error('Ставка податку не може бути негативною');
    }
    return amount * (taxRate / 100);
}

module.exports = calculateTax;
