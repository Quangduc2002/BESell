const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
      _id: {type: Number},
      Email: { type: String  },
      PassWord: { type: String  },
      Name: { type: String  },
      RoleId: { type: String  },
      DateOfBirth: {type: String},
    },
    {
      // không có mongodb tác động vào trường id
      _id: false,
      //thời gian create update
      timestamps: true,
    },
  );

  module.exports = mongoose.model('User', UserSchema);