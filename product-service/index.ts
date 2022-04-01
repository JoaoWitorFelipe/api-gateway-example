import { Request, Response } from 'express'
import express from 'express'
const app = express()

app.get('/products', (req: Request, res: Response) => res.send("PRODUCT SERVICE API"));

const PORT: number = 3002;
app.listen(PORT, () => console.log(`Product service started in port ${PORT}`));


