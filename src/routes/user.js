const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.delete('/:id/Customer', userController.DelCustomer);
router.get('/Customer', userController.getCustomer);
router.post('/register', userController.Register);
router.post('/login', userController.handleLogin);

module.exports = router;