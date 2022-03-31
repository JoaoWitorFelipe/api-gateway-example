import express from 'express'
import { Request, Response } from 'express'
import proxy from 'express-http-proxy'
import { USERS_SERVICE, PRODUCTS_SERVICE } from './available_services.js';
import authMiddleware from './middlewares/authentication_user_middleware'

const app = express()
const userServiceProxy = proxy(USERS_SERVICE);
const productServiceProxy = proxy(PRODUCTS_SERVICE);

app.post('/users/authentication', userServiceProxy);

app.use(authMiddleware);

app.get('/', (req: Request, res: Response) => res.send("API GATEWAY"));
app.get('/users', userServiceProxy);

app.get('/products', productServiceProxy);

const PORT: number = 3000;
app.listen(PORT, () => console.log(`API Gateway started in port ${PORT}`));
