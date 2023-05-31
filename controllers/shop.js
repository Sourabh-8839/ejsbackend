const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async(req, res, next) => {
  const products=await Product.findAll();

   res.render('shop/product-list', {
    prods:products,
    pageTitle: 'All Products',
    path: '/products'
  })
}


exports.getProduct = async(req, res, next) => {
  const prodId = req.params.productId;

  //Alternative of find by Primary key.

  // const product=await Product.findAll({where:
  //   {id:prodId}});
  //   res.render('shop/product-detail', {
  //     product:product[0],
  //     pageTitle: product[0].title,
  //     path: '/products'
  //   });

  const product=await Product.findByPk(prodId);
  // console.log(product.title);
 

  res.render('shop/product-detail', {
    product:product,
    pageTitle: product.title,
    path: '/products'
  });

};

exports.getIndex =async(req, res, next) => {
  const products=await Product.findAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })}
  

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
