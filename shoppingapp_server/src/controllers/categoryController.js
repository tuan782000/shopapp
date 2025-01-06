const CategoryModel = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json({
      message: "Get list brands successfully",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCategoryWithId = async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  try {
    const category = await CategoryModel.findById(id);

    res.status(200).json({
      message: "Get category successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addCategory = async (req, res) => {
  const body = req.body;
  try {
    const category = new CategoryModel(body);

    await category.save();

    res.status(201).json({
      message: "Add category successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// nhiều cái dùng query
// một cái nên dùng params

const editCategory = async (req, res) => {
  const { id } = req.params;
  const dataUpdated = req.body;

  try {
    const categoryUpdated = await CategoryModel.findByIdAndUpdate(
      id,
      dataUpdated
    );

    if (!categoryUpdated) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Updated category successfully",
      data: categoryUpdated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const removeCategory = async (req, res) => {
  const { id } = req.query;

  try {
    await CategoryModel.findByIdAndDelete(id);

    res.status(201).json({
      message: "Remove category successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryWithId,
  addCategory,
  editCategory,
  removeCategory,
};
