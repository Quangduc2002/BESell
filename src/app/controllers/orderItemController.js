const OrderItem = require("../models/Orderitem")

class OrderItemController {

    //[GET] /orderItem
    async getOrderItem (req, res, next){
        try{
            const save = await OrderItem.find().populate("Product");
            res.status(200).json(save);
        }catch(err){
            res.status(500).json(err);
        }
    }
  
}

module.exports = new OrderItemController();