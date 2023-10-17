const productModel = require('../model/productSchema')

module.exports = {
    insertProduct: async(req,res)=>{
        try {       
            const product = req.body;
            const createProduct = new productModel(product);
            const saved = await createProduct.save();
            if(saved){
                return res.status(200).json({message:"Product Added Successfully"});
            }else{
                return res.status(404).json({message:"Internal Unable to Add Product"});
            }
        } catch (error) {
            return res.status(500).json({message:"Internal Server Error"});
        }
    },
    getProducts: async(req,res) =>{
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        const products = await productModel.find().skip(skip).limit(parseInt(limit)).exec()
        const totalProducts = await productModel.countDocuments();
        console.log(products)
        res.json({docs: products,totalPages: Math.ceil(totalProducts / limit),});
    },
    deleteProduct:async(req,res)=>{
        try {
            const {productId} = req.body
            const deleteProduct = await productModel.deleteOne({_id:productId})
            if(deleteProduct) res.status(200).json({message:"Product Deleted Successfully"})
            else res.status(404).json({message:"Unable to delete the product"})
        } catch (error) {
            return res.status(500).json({message:"Internal Server Error"})
        }
    }
}