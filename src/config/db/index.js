const mongoose = require('mongoose');
async function connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/QLNoiThat');
      console.log('Connect successful');
    } catch (err) {
      console.log('Connect failed');
    }
  }
module.exports= {connect}