const fs = require('fs').promises;

class ProductManager {
    static async getAllProducts(limit) {
        try {
            const data = await fs.readFile('./src/productos.json', 'utf8');
            const productos = JSON.parse(data);
            if (limit) {
                return productos.slice(0, limit);
            } else {
                return productos;
            }
        } catch (error) {
            throw new Error('Error al obtener los productos');
        }
    }

    static async getProductById(pid) {
        try {
            const data = await fs.readFile('./src/productos.json', 'utf8');
            const productos = JSON.parse(data);
            const producto = productos.find(p => p.id === pid);
            return producto; 
        } catch (error) {
            throw new Error('Error al obtener el producto');
        }
    }
}

module.exports = ProductManager;


const ProductManager = require('./productManager');

const newProduct = {
    id: 'product_id',
    title: 'Nuevo producto',
    price: 10.99
};

ProductManager.addProduct(newProduct)
    .then(() => {
        console.log('Producto agregado con éxito.');
    })
    .catch(error => {
        console.error('Error al agregar el producto:', error);
    });
