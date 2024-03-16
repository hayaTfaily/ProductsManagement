const Product=require('../models/productModel')
const validator=require('validator')

//Get all products
const getProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json(products);
  };

//Create product
const createProd = async (req, res) => {
  const { name, mEmail, store } = req.body;


  if(!validator.isEmail(mEmail)){
    return res.status(400).json({error: "Not A Valid Email!"});
}

  const productExist = await Product.findOne({ name });

  if (productExist) {
    res.json({ message: "Product Already Exists !!" });
  } else {
    const product = await Product.create({
      name,
      mEmail,
      store
    });

    res.status(201).json(product);
  }
};

//update product
const updateProd = async (req, res) => {
  const { name, mEmail, store } = req.body;
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: id },
    { name, mEmail, store },
    { new: true }
  );
  res.status(200).json(product);

};

//delete product
const deleteProd = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete({ _id: id });
  res.status(200).json(product);
};

module.exports={ getProducts, createProd, updateProd, deleteProd };
