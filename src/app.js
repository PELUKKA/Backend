//impotacion de dependenciaa

const express = require('express')
const manager = new ProductManager('./productos.json')
const ProductManager = require('../productManager.js')

//configurascion del server
const app = express()
const PORT = 8080


app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.get('/productos', async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getAllProducts(limit);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.get('/productos/:pid', async (req, res) => {
    try {
        const producto = await productManager.getProductById(req.params.pid);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
    