const { Router } = require("express");
const { addSearchKey, getAll } = require("../controllers/searchController");

const searchRouter = Router();

searchRouter.post("/add-search", addSearchKey);
searchRouter.get("/get-all", getAll);

module.exports = searchRouter;
