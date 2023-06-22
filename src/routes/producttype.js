const express = require('express');
const router = express.Router();


const producttypeController = require('../app/controllers/producttypeController');


router.post('/add', producttypeController.addProducttype);
router.get('/:id', producttypeController.getIdProduct);
router.get('/', producttypeController.getProduct);

module.exports = router;