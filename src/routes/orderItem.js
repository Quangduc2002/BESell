const express = require('express');
const router = express.Router();

const OrderItemController = require("../app/controllers/orderItemController")


router.get('/', OrderItemController.getOrderItem);
module.exports = router;