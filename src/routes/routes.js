const express = require('express');
const router = express()

router.use('/api/v1/user', require('./v1/user.routes'))
// router.use('/api/v1/product', require('./v1/products.routes'))


  
module.exports = router