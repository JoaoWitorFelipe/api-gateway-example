const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cookieParser('my-secret'));

const router = express.Router();
router.get('/', (req, res) => res.send("USER SERVICE API"));
router.post('/authentication', (req, res) => {
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

const PORT = 3001;
app.listen(PORT, () => console.log(`User service started in port ${PORT}`));


