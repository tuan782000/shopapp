const PromoCodeModel = require("../models/promoCodeModel");

const getAllPromoCode = async (req, res) => {
  try {
    const listPromoCodes = await PromoCodeModel.find();

    if (!listPromoCodes) {
      res.status(404).json({
        message: "Data not found",
      });
    }

    res.status(200).json({
      message: "Get all list PromoCode successfully",
      data: listPromoCodes,
    });
    // const promoCode = await PromoCodeModel(body);
    // await promoCode.save();
    // res.status(200).json({
    //   message: "Add new PromoCode successfully",
    //   data: promoCode,
    // });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const addNewPromoCode = async (req, res) => {
  const body = req.body;
  //   console.log(body);

  try {
    const code = body.code;
    const item = await PromoCodeModel.findOne({ code });

    if (item) {
      throw new Error("Promo Code is already exits");
    }

    const promoCode = await new PromoCodeModel(body);
    await promoCode.save();
    res.status(200).json({
      message: "Add new PromoCode successfully",
      data: promoCode,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updatePromoCode = async (req, res) => {
  const { id } = req.params;
  const dataPromoCodeUpdate = req.body;
  // console.log(dataPromoCodeUpdate);

  try {
    console.log(dataPromoCodeUpdate);
    const promoCodeUpdated = await PromoCodeModel.findByIdAndUpdate(
      id,
      dataPromoCodeUpdate
    );

    console.log(dataPromoCodeUpdate);
    console.log(promoCodeUpdated);

    if (!promoCodeUpdated) {
      res.status(404).json({
        message: "Can't found PromoCode to Update",
      });
    }

    res.status(200).json({
      message: "Updated PromoCode Successfully",
      data: promoCodeUpdated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const removePromoCode = async (req, res) => {
  const { id } = req.query;
  //   console.log(body);

  try {
    await PromoCodeModel.findByIdAndDelete(id);
    res.status(201).json({
      message: "Remove PromoCode successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addNewPromoCode,
  getAllPromoCode,
  updatePromoCode,
  removePromoCode,
};
