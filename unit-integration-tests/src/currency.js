// src/currency.js

/**
 * Перетворює рядок з валютою на число.
 * @param {string} value - Наприклад, "$50".
 * @returns {number} - Наприклад, 50.
 */
function parseCurrency(value) {
    return parseFloat(value.replace('$', ''));
}

/**
 * Форматує число у формат валюти.
 * @param {number} value - Наприклад, 100.
 * @returns {string} - Наприклад, "$100".
 */
function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

/**
 * Додає два значення валюти.
 * інтегрує дві попередні функції 
 * для додавання форматованих значень.
 * @param {string} value1 - Наприклад, "$50".
 * @param {string} value2 - Наприклад, "$30".
 * @returns {string} - Наприклад, "$80".
 */
function addCurrencies(value1, value2) {
    const num1 = parseCurrency(value1);
    const num2 = parseCurrency(value2);
    const sum = num1 + num2;
    return formatCurrency(sum);
}

module.exports = { parseCurrency, formatCurrency, addCurrencies };
