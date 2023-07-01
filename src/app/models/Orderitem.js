const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const OrderitemSchema = new Schema(
    {
        MaSp: {
            type: Number,
        },
        
        Product: [
            {
                // _id: {type: mongoose.Schema.Types.ObjectId, ref: "Product", },
                qty: {type: Number },
                total: {type: String },
                Image: {type: String },
                TenSp: {type: String },
            },
        ]
    },
    {
    //   _id: false,
      //thời gian create update
      timestamps: true,
    },
  );

  module.exports = mongoose.model('OrderItem', OrderitemSchema);