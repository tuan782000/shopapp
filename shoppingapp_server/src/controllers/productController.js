const ProductModel = require("../models/productModel");

const getProducts = async (req, res) => {
  // coi xem có limit và sort gửi kèm không
  const { limit, sort, sortby, id, title } = req.query;

  let filter = {};

  if (id) {
    if (sortby === "brands") {
      filter = { brands: { $eq: id } };
    } else if (sortby === "categories") {
      filter = { categories: { $in: id } };
    } else {
    }
  }

  if (title) {
    filter.slug = { $regex: title };
  }

  // console.log(sortby, id);
  // console.log(filter);

  try {
    const products = await ProductModel.find(filter).limit(limit ?? ""); // nếu có limit truyền vào đây không thì chuỗi rỗng

    // console.log(products);

    res.status(200).json({
      message: "Get list products successfully",
      data: sort ? products.sort((a, b) => b.views - a.views) : products, // còn này nếu có sort thì sort không trả ra product bình thường
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductWithId = async (req, res) => {
  const { id } = req.params;

  // console.log(id);
  try {
    const product = await ProductModel.findById(id);

    res.status(200).json({
      message: "Get product successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  const body = req.body;
  try {
    const product = new ProductModel(body);

    await product.save();

    res.status(201).json({
      message: "Add product successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const dataUpdated = req.body;

  try {
    const productUpdated = await ProductModel.findByIdAndUpdate(
      id,
      dataUpdated
    );

    if (!productUpdated) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Updated product successfully",
      data: productUpdated,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.query;

  try {
    await ProductModel.findByIdAndDelete(id);

    res.status(201).json({
      message: "Remove product successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductSizes = async (req, res) => {
  try {
    // call api get all list products
    const products = await ProductModel.find();
    // create 1 array - to save all size - I get all products
    const items = [];

    // use forEach check an item and get sizes an item
    products.forEach((item) => {
      // console.log(item.sizes);
      const sizes = item.sizes;
      // when we have sizes we use forEach get one size - notice: one size get once, so !items.includes(size) help us "loại bỏ" cái size nếu trùng
      sizes.forEach((size) => !items.includes(size) && items.push(size));

      // console.log(items);
    });

    res.status(201).json({
      message: "Get size all products successfully",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductPrices = async (req, res) => {
  try {
    // call api get all list products
    const products = await ProductModel.find();
    // create 1 array - to save all size - I get all products
    const items = [];

    // use forEach check an item and get sizes an item
    products.forEach((item) => {
      // console.log(item.price);
      items.push(item.price);
    });

    res.status(201).json({
      message: "Get price all products successfully",
      data: {
        min: Math.min(...items),
        max: Math.max(...items),
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const filterProducts = async (req, res) => {
  // coi xem có limit và sort gửi kèm không
  const body = req.body;

  // Tại sao không lấy từ body mà lấy từ query
  // categories nó là 1 string array và sizes cũng là 1 string array mà trên domain: không thể truyền được array nên là dùng body

  // ví dụ: /products/filter?categories=[]&sizes=[]&min=250&max=5000 - query sẽ không làm được như vầy

  // Tại vì truyền được ở trên params hoặc query phải là string

  // còn body sẽ truyền được mọi thứ

  // 1 ngoài lề khác - Muốn truyền file phải truyền trong Form

  // console.log(body);

  /*
  const filter = {
    categories: {  $in: body.categoriesSelected },
    sizes: { $in: body.sizesSelected },
    price: { $gte: body.price.min, $lte: body.price.max },
  };
  */

  const categoriesSelected = body.categoriesSelected || [];
  const sizesSelected = body.sizesSelected || [];
  const price = body.price || {};

  let filter = {};

  /*
  // price: { $gte: body.price.min, $lte: body.price.max },
    $and: [
      { price: { $gte: body.price.min } },
      { price: { $lte: body.price.max } },
    ],
  */

  // Chỉ thêm bộ lọc giá nếu min và max không bằng 0
  if (price.min !== 0 || price.max !== 0) {
    filter.$and = [
      { price: { $gte: price.min } },
      { price: { $lte: price.max } },
    ];
  }

  if (categoriesSelected.length > 0) {
    filter.categories = { $in: categoriesSelected };
  }

  if (sizesSelected.length > 0) {
    filter.sizes = { $in: sizesSelected };
  }

  try {
    const items = await ProductModel.find(filter);

    console.log(items);
    res.status(200).json({
      message: "Get list products successfully",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductFavourites = async (req, res) => {
  const listIdProductFavourites = req.body;
  console.log(listIdProductFavourites);

  try {
    const listProducts = await ProductModel.find();

    const favouriteProducts = listProducts.filter((product) =>
      listIdProductFavourites.includes(product._id.toString())
    );
    console.log(favouriteProducts);

    res.status(201).json({
      message: "Get list favourite products successfully",
      data: favouriteProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductWithId,
  addProduct,
  editProduct,
  removeProduct,
  getProductSizes,
  getProductPrices,
  filterProducts,
  getProductFavourites,
};
