const Router = require("express");

const {
  addNewPromoCode,
  getAllPromoCode,
  updatePromoCode,
  removePromoCode,
} = require("../controllers/promoCodeController.js");

const promoCodeRouter = Router();

promoCodeRouter.get("/all-promoCode", getAllPromoCode);
promoCodeRouter.post("/add-promoCode", addNewPromoCode);
promoCodeRouter.put("/update-promoCode/:id", updatePromoCode);
promoCodeRouter.delete("/remove-promoCode", removePromoCode);

module.exports = promoCodeRouter;
