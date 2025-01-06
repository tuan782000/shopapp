const SearchModel = require("../models/searchModel.js");

const addSearchKey = async (req, res) => {
  const body = req.body;

  try {
    const slug = body.slug;

    const item = await SearchModel.findOne({ slug });

    if (item) {
      item.count += 1;

      await SearchModel.findByIdAndUpdate(id, { count: item.count + 1 });
    } else {
      const newSearch = SearchModel(body);
      await newSearch.save();
    }

    res.status(200).json({
      message: "Saved",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  const { id } = req.query;

  try {
    const items = await SearchModel.find({ createdBy: { $eq: id } });

    res.status(200).json({
      message: "items",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addSearchKey,
  getAll,
};
