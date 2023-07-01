const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {
        orderItem: {
            type: Number,
        },
        MaKH: {
            type: Number
        },
        TenKH: {
            type: String,
        },
        DiaChi: {
            type: String,
        },
        SoDT: {
            type: String,
        },
        Email: {
            type: String,
        },
        PhuongThucThanhToan: {
            type: String,
        },
        TrangThaiDH: {
            type: Boolean,
        },
        ProductOrder: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderItem"
            }
          ]
        
    },
    {
    //   _id: false,
      //thời gian create update
      timestamps: true,
    },
  );

  module.exports = mongoose.model('Order', OrderSchema);