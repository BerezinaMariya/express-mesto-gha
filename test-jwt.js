const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkwNzY4NDc0NDYwOGE5YmM1YzdmNDUiLCJpYXQiOjE2NzA1MTE2NTMsImV4cCI6MTY3MTExNjQ1M30.fq9tsVPzHhBvUJeWk_RY1gCtlHCw54Sj74ZaNZHPVCQ'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'some-secret-key'; // вставьте сюда секретный ключ для разработки из кода

module.exports.testJwt = () => {
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);

    console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
  }
};
