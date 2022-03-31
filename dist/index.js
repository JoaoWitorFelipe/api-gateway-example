"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const available_services_js_1 = require("./available_services.js");
const authentication_user_middleware_1 = __importDefault(require("./middlewares/authentication_user_middleware"));
const app = (0, express_1.default)();
const userServiceProxy = (0, express_http_proxy_1.default)(available_services_js_1.USERS_SERVICE);
const productServiceProxy = (0, express_http_proxy_1.default)(available_services_js_1.PRODUCTS_SERVICE);
app.post('/users/authentication', userServiceProxy);
app.use(authentication_user_middleware_1.default);
app.get('/', (req, res) => res.send("API GATEWAY"));
app.get('/users', userServiceProxy);
app.get('/products', productServiceProxy);
const PORT = 3000;
app.listen(PORT, () => console.log(`API Gateway started in port ${PORT}`));
//# sourceMappingURL=index.js.map