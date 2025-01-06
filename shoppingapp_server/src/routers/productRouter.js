const { Router } = require("express");
const {
  getProducts,
  addProduct,
  removeProduct,
  editProduct,
  getProductWithId,
  getProductSizes,
  getProductPrices,
  filterProducts,
  getProductFavourites,
} = require("../controllers/productController");

const productRouter = Router();

productRouter.get("/all-products", getProducts);
productRouter.get("/detail-product/:id", getProductWithId);
productRouter.post("/add-product", addProduct);
productRouter.put("/update-product/:id", editProduct);
productRouter.delete("/remove-product", removeProduct);
productRouter.get("/get-product-sizes", getProductSizes);
productRouter.get("/get-product-prices", getProductPrices);
productRouter.post("/filter-products", filterProducts);
productRouter.post("/get-product-favourites", getProductFavourites);

module.exports = productRouter;
