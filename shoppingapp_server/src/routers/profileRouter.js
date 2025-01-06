const { Router } = require("express");
const {
  getProfile,
  updateFavourites,
} = require("../controllers/userController");

const profileRouter = Router();

profileRouter.get("/", getProfile);
profileRouter.put("/update-favourites", updateFavourites);

module.exports = profileRouter;
