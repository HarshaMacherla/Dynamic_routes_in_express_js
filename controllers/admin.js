const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  Product.create({ title, price, description, imageUrl })
    .then((result) => {
      console.log("Created Product");
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const { productId } = req.params;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.error(err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  Product.update(
    {
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    },
    { where: { id: productId } }
  )
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};

exports.getDeleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.destroy({
    where: { id: productId },
  })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.error(err));
};
