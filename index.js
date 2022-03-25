const app = require('express')();
const proxy = require('express-http-proxy');

const { USERS_SERVICE, PRODUCTS_SERVICE } = require('./available_services.js');

const userServiceProxy = proxy(USERS_SERVICE);
const productServiceProxy = proxy(PRODUCTS_SERVICE);

app.get('/', (req, res) => res.send("API GATEWAY"));
app.get('/users', (req, res, next) => userServiceProxy(req, res, next));
app.get('/products', (req, res, next) => productServiceProxy(req, res, next));

const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway started in port ${PORT}`));
