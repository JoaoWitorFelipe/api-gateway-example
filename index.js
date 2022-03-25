const app = require('express')();
const proxy = require('express-http-proxy');
const axios = require('axios');

const { USERS_SERVICE, PRODUCTS_SERVICE } = require('./available_services.js');

const userServiceProxy = proxy(USERS_SERVICE);
const productServiceProxy = proxy(PRODUCTS_SERVICE);

app.get('/', (req, res) => res.send("API GATEWAY"));

app.get('/users', (req, res, next) => userServiceProxy(req, res, next));
app.post('/users/authentication', userServiceProxy);


app.get('/products', async (req, res, next) => {
    
    const isAuthResponse = await axios.get(USERS_SERVICE + "/users/is-authenticated", {
        headers: req.headers
    });

    if (isAuthResponse.data.ok) {
        return productServiceProxy(req, res, next)
    }

    return res.send('without_permission');

});

const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway started in port ${PORT}`));
