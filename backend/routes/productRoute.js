const express = require("express");
const { createProd, updateProd , deleteProd, getProducts}=require("../controllers/productController");

const router = express.Router();

router.get("/list", getProducts);
router.post("/create", createProd);
router.put("/update/:id", updateProd);
router.delete("/delete/:id", deleteProd);

module.exports=router;