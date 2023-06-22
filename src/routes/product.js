const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/productController');


// add image
const multer = require('multer');
// add image vào folder
const storage = multer.diskStorage({
    destination: (req,file, res) => {
        // đường link lưu image
        res(null, '../banhang/public/Image');
    },

    filename: (req, file, res) => {
        res(null, file.originalname)
    }
});

const upload = multer({storage: storage})

router.put('/:id/rating', productController.rating);
router.delete('/:id/delete', productController.delete);
router.put('/:id/edit',upload.single("Image"), productController.edit);
router.post('/add',upload.single("Image"), productController.addProduct);
router.get('/:id', productController.getIdProduct);
router.get('/', productController.getProduct);

module.exports = router;