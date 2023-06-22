const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
    {
      // _id: {type: Number},
      TenSp: { type: String, require: true },
      Image: { type: String },
      ChatLieu: { type: String },
      GiaNhap: { type: String},
      GiaBan: { type: String },
      GiamGia: { type: String },
      TongDanhGia: { type: Number, default:0 },
      NumReview: { type: Number, default:0 },
      Ratings: [
        {
          star: {type: Number},
        }
      ],
      ProducttypeId: {
        type: mongoose.Schema.Types.Number,
        ref: "Producttype",
      },

    },
    {
      // _id: false,
      //thời gian create update
      timestamps: true,
    },
  );

  module.exports = mongoose.model('Product', ProductSchema);