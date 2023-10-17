const { Router } = require('express');
const router = Router();
const {insertProduct,getProducts,deleteProduct} = require('../controller/productController')

router.post('/addProduct',insertProduct);
router.get('/getProducts',getProducts);
router.delete('/deleteProduct',deleteProduct)


module.exports = router;