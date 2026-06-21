const axios = require('axios');
const calculateCartTotal = require('./cart');

/**
 * Оформлює замовлення, рахує фінал та відправляє на платіжний/логістичний шлюз через axios.
 * 
 * @param {Object} cart - Об'єкт кошика з товарами та купонами: { items, couponCode, taxRate }
 * @param {string} userEmail - Електронна пошта користувача.
 * @returns {Promise<Object>} - Результат оформлення замовлення.
 */
async function processCheckout(cart, userEmail) {
    if (!userEmail || !userEmail.includes('@')) {
        throw new Error('Некоректний email користувача');
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error('Кошик не може бути порожнім');
    }

    // 1. Інтегруємося з модулем кошика для розрахунку вартості
    const totals = calculateCartTotal(cart.items, cart.couponCode, cart.taxRate);

    // 2. Створюємо об'єкт замовлення
    const orderData = {
        email: userEmail,
        orderItems: cart.items,
        totals,
        createdAt: new Date().toISOString()
    };

    // 3. Відправляємо на зовнішній API (наприклад, JSONPlaceholder)
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', orderData);

    return {
        success: true,
        orderId: response.data.id, // зазвичай повертається id створеного запису
        order: orderData
    };
}

module.exports = processCheckout;
