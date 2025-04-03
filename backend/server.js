import express from 'express';
import { connectDB } from './config/db.js'
import { Product } from './models/product.model.js'

const app = express();

app.use(express.json())

app.post('/api/products', async (req, res) => {
    const product = req.body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    } catch(error) {
        console.log(`Error while processing ${error.message}`)
        res.status(500).json({success: false, message: "Server Error"}) 
    }

})

app.delete('/api/products/:id', async (req, res) => {
    const {id} = req.params
    
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Product deleted successfully"})
    } catch(error) {
        res.status(404).json({sccuess: false, message: 'Product not found'})
    }

})

app.listen(8080, () => {
    connectDB()
    console.log('Server is running at http://localhost:8080');
})
