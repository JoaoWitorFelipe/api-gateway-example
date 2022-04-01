import { Request, Response } from 'express'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());
app.use(cookieParser('my-secret'));


const router = express.Router();
router.get('/', (req: Request, res: Response) => res.send("USER SERVICE API"));
router.post('/authentication', (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email == 'adm@gmail.com' && password == 'abc123') {
        return res.cookie('user', 'admin', { 
            signed: true, 
            maxAge: 30000
         }).send("authenticated");
    }

    return res.send('credentials_not_found');
});

router.get('/is-authenticated', (req, res) => {
    if (req.signedCookies.user == 'admin') {
        return res.send({ "ok": true });
    }

    return res.send({ "ok": false });
});


app.use('/users', router);

const PORT: number = 3001;
app.listen(PORT, () => console.log(`User service started in port ${PORT}`));


