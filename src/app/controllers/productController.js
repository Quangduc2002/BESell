const Product = require('../models/Product');
const Producttype = require('../models/Producttype');

class ProductController {

    // /products/add
    async addProduct (req, res, next) {
        try{
            req.body.Image =  req.file ?  req.file.filename : "";
            const newProduct = new Product(req.body);
            const save = await newProduct.save();
            if(req.body.ProducttypeId){
                const product = Producttype.findById(req.body.ProducttypeId)
                await product.updateOne({$push: {Product: save._id}})
            }
            res.status(200).json("add success");
        }catch(err){
            res.status(500).json(err);
        }
    }
    
    // /products
    async getProduct (req, res, next) {
        try{
            const save = await Product.find();
            res.status(200).json(save);
        }catch(err){
            res.status(500).json(err);
        }
    }

     // [GET]/products/:id
     async getIdProduct (req, res, next) {
        try{
            const save = await Product.findById({_id: req.params.id});
            res.status(200).json(save);
        }catch(err){
            res.status(500).json(err);
        }
    }

    // [PUT] /products/:id/edit
  async edit(req, res, next) {
    try{
        const product = await Product.findById({_id: req.params.id});
        await product.updateOne({$set: req.body});
        const save = await product.save();
        await Producttype.updateMany(
            {Product: req.params.id},
            {$pull: {Product: req.params.id}}
        )
        // update loại sản phẩm
        if(req.body.ProducttypeId){
            const product = Producttype.findById(req.body.ProducttypeId)
            await product.updateOne({$push: {Product: save._id}})
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
  }

    // [DELETE] /products/:id/delete
    async delete(req, res, next) {
        try{
            //xóa id ở Product trong bảng Producttypes
            await Producttype.updateMany(
                {Product: req.params.id},
                //xóa phần tử
                {$pull: {Product: req.params.id}}
            )
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("delete success");
        }catch(err){
            res.status(500).json(err);
        }
      }


    // [PUT] /products/:id/rating
    async rating(req, res)  {
        const product = await Product.findById(req.params.id)

        if (product) {
            product.Ratings.push({star: req.body.star})
            product.NumReview = product.Ratings.length
            product.TongDanhGia = product.Ratings.reduce((acc, item) => item.star + acc, 0) / product.Ratings.length
            await product.save()
            res.status(200).json({ message: 'Review added' })
        } 
        else {
          res.status(404)
          throw new Error('Product not found')
        }
    }
}

module.exports = new ProductController();