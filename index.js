const app = require('express')();
const proxy = require('express-http-proxy');
const axios = require('axios');

const { USERS_SERVICE, PRODUCTS_SERVICE } = require('./available_services.js');

const userServiceProxy = proxy(USERS_SERVICE);
const productServiceProxy = proxy(PRODUCTS_SERVICE);

app.post('/users/authentication', userServiceProxy);

app.use(require('./middlewares/authentication_user_middleware'));

app.get('/', (req, res) => res.send("API GATEWAY"));
app.get('/users', userServiceProxy);

app.get('/products', productServiceProxy);

const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway started in port ${PORT}`));
