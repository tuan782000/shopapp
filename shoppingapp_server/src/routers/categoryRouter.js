const { Router } = require("express");
const {
  getCategories,
  addCategory,
  removeCategory,
  getCategoryWithId,
  editCategory,
} = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/all-categories", getCategories);
categoryRouter.get("/detail-category/:id", getCategoryWithId);
categoryRouter.post("/add-category", addCategory);
categoryRouter.put("/edit-category/:id", editCategory);
categoryRouter.delete("/remove-category", removeCategory);

module.exports = categoryRouter;
