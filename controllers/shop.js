const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().
  then(([rows,filedata])=>{ res.render('shop/product-list', {
    prods:rows,
    pageTitle: 'All Products',
    path: '/products'
  })
})
.catch(err=>console.log(err));
};

exports.getProduct = async(req, res, next) => {
  const prodId = req.params.productId;

  const [product] =await Product.findById(prodId);
  
  const [data] = product;
  console.log(product.title);
  res.render('shop/product-detail', {
    product:data,
    pageTitle: data.title,
    path: '/products'
  });

};

exports.getIndex =async(req, res, next) => {
  const products=await Product.fetchAll();

 const [data] = products;

  res.render('shop/index', {
    prods: data,
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
