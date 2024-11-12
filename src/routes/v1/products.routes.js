const express = require("express");
const { getAllProducts, createProduct } = require("../../controllers/v1/product.controller");
const router = express();


router.get('/all', getAllProducts)
router.post('/create', createProduct)

module.exports = router;
