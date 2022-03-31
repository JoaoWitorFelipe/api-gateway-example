const app = require('express')();
app.get('/products', (req, res) => res.send("PRODUCT SERVICE API"));
const PORT = 3002;
app.listen(PORT, () => console.log(`Product service started in port ${PORT}`));
//# sourceMappingURL=index.js.map