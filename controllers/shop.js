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
  

exports.getCart = async(req, res, next) => {

  const cart=await req.user.getCart();

  const products = await cart.getProducts();
  
  console.log(products);

  res.render('shop/cart', {
    path: '/cart',
    pageTitle:'Your Products',
    products: products
  });
};

exports.postCart = async(req, res, next) => {
  const prodId = req.body.productId;

  const cart = await req.user.getCart();

  const productArr = await cart.getProducts({where:{id:prodId}});

  let product;
  


  if(productArr.length>0){
    product= productArr[0];
  }

  let newQuantity = 1;

  if(product){
    const previousQuant = product.cartIem.quantity;
    newQuantity=previousQuant+1;
  }

   const prod=await Product.findByPk(prodId);

    await cart.addProducts(prod,{through:{quantity:newQuantity}});

  res.redirect('/cart');
};

exports.postCartDeleteProduct =async(req,res)=>{
  const prodId = req.body.productId;

  const cart=await req.user.getCart();

  const productArr= await  cart.getProducts({where:{id:prodId}});

  const product = productArr[0];

  console.log(product);
  await product.cartIem.destroy();

  res.redirect('/cart');

}
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
