const isPasswordValid = require('../src/auth');

test('Перевірка валідності пароля', () => {
    expect(isPasswordValid('password123')).toBe(true); // Валідний пароль
    expect(isPasswordValid('short')).toBe(false); // Занадто короткий пароль
});
