const Producttype = require('../models/Producttype');
const { request } = require('express');

class ProducttypeController {
    // producttypes/add
    async addProducttype (req, res, next) {
        Producttype.findOne({})
        .sort({_id: 'desc'})
        .then(latesCourse => {
            // id tự tăng
          req.body._id = latesCourse._id + 1;
          const producttype = new Producttype(req.body);
          producttype.save()
              .then(() => res.status(200).json())
              .catch(() => res.status(500).json())
        })
    }

    
    // producttypes/:id
    async getIdProduct (req, res, next) {
        try{
            const save = await Producttype.findById(req.params.id).populate("Product");
            res.status(200).json(save);
        }catch(err){
            res.status(500).json(err);
        }
    }

      // producttypes
      async getProduct (req, res, next) {
        try{
            const save = await Producttype.find().populate("Product");
            res.status(200).json(save);
        }catch(err){
            res.status(500).json(err);
        }
    }
  
}

module.exports = new ProducttypeController();