const mongoose=require("mongoose")

const productSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mEmail: {
    type: String,
    required: true,
  },
  store: {
    type: String,
    required: true,
  }
});

const Product = mongoose.model("products", productSchema);

module.exports=Product;