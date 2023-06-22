const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ProducttypeSchema = new Schema(
    {
      _id: {type: Number},
      TenLoaiSp: { type: String, require: true },
      Product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
      ]
    },
    {
      _id: false,
      //thời gian create update
      timestamps: true,
    },
  );

  module.exports = mongoose.model('Producttype', ProducttypeSchema);