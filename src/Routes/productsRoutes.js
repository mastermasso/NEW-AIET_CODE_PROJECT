const express = require('express');
const router = express.Router();
const products  = require('../data/products.json');
const parser = require('body-parser');
router.use(express.json());




// GET all products
router.get('/', (req, res) => {
 
 // console.log(JSON.stringify({products}));


  res.json({ "message": "Get all products",
    "data":products
  });
});

// GET a single product by ID
router.get('/product/:id', (req, res) => {
var product = products.find(pro => pro.id === parseInt(req.params.id));
console.log(req.params.id);
if(!product){
  console.log('product could not be found')
}
  res.json ({ message: `Get product ${JSON.stringify(req.params.id)}:${JSON.stringify(product)}`,
  data:product});
});

//Post a new product  
router.post("/create_product",(req,res)=>{
  var myData = req.body;
  console.log(myData);
  res.json({ message:"Create a new product",body:myData});
});

//Put/update a product
router.put("/put/update_product", (req, res)=> {
  res.json({message: 'Update product ${req.params.id}'});
});

//DELETE a product
router.delete("/:id",(req,res)=>{
res.json({message:'Delete product ${req.params.id'});
});

module.exports = router;