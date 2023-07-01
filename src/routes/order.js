const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/orderController');

router.post('/Email', orderController.sendEmail);
router.get('/listOrder', orderController.getOrder);
router.post('/', orderController.addOrder);
module.exports = router;