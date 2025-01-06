const Router = require("express");

const {
  addNewAddress,
  getAllAddress,
  removeAddress,
  updateAddress,
} = require("../controllers/addressController");

const addressRouter = Router();

addressRouter.post("/add-address", addNewAddress);
addressRouter.get("/list-address/:id", getAllAddress);
addressRouter.put("/update-address/:id", updateAddress);
addressRouter.delete("/remove-address", removeAddress);

module.exports = addressRouter;
