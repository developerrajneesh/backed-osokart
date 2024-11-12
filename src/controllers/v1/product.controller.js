const {
    SuccessResponse,
    ErrorResponse,
  } = require("../../handlers/API_response");
  const path = require("path");
  const ProductSchema = require("../../models/product.modal");
  const fs = require('fs');
// ---------------------------Get All Products-------------------------------------
async function getAllProducts(req, res, ) {
    try {
        const products = await ProductSchema.find()
        res.status(200).json(SuccessResponse(200,'Data retrivel successful',products))
    } catch (error) {
        res
      .status(500)
      .json(ErrorResponse(500, "Data retrivel unsuccessful", error));
    }

}


// ---------------------------create All Products-------------------------------------

async function createProduct(req, res, ) {
    // const jsonPath = path.join(__dirname, "../../../", "jsonData", 'products.json')
    
    try {
        // const jsonData = fs.readFileSync(jsonPath, 'utf8');
        // const products = JSON.parse(jsonData);
        
        // // Insert the data into MongoDB using Mongoose
        // const result = await ProductSchema.insertMany(products);
        // console.log(result);

        // const products = await ProductSchema.find()
        // res.status(200).json(SuccessResponse(200,'Data retrivel successful',products))
    } catch (error) {
        console.log(error);
        
    //     res
    //   .status(500)
    //   .json(ErrorResponse(500, "Data retrivel unsuccessful", error));
    }

}

module.exports = {getAllProducts,createProduct}