const app = require('express')();

app.get('/users', (req, res) => res.send("USER SERVICE API"));

const PORT = 3001;
app.listen(PORT, () => console.log(`User service started in port ${PORT}`));


