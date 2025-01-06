const { Router } = require("express");
const {
  getBrands,
  addBrand,
  removeBrand,
  getBrandWithId,
  editBrand,
} = require("../controllers/brandController");

const brandRouter = Router();

brandRouter.get("/all-brands", getBrands);
brandRouter.get("/detail-brand/:id", getBrandWithId);
brandRouter.post("/add-brand", addBrand);
brandRouter.put("/edit-brand/:id", editBrand);
brandRouter.delete("/remove-brand", removeBrand);

module.exports = brandRouter;
