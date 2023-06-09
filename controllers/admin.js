const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async(req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // const p=await req.user.createProduct({
  //   title:title,
  //   price:price,
  //   imageUrl:imageUrl,
  //   description:description,
    
  // });
  
  const p=await Product.create({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  });
  // console.log(p);
   
res.send(p);
};

exports.getEditProduct = async(req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  const product=await Product.findByPk(prodId);

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  
};

exports.postEditProduct = async(req,res)=>{
try {
  const proId = req.body.productId;
  const updatedTitle = req.body.title;
  // const updatedname = req.body.name;
  const updatedDescription=req.body.description;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;

  const product = await Product.findByPk(proId);

    product.title=updatedTitle,
    product.description=updatedDescription,
    product.price=updatedPrice,
    product.imageUrl=updatedImgUrl,
    
    await product.save();

    res.redirect('/admin/products');
} catch (error) {
 console.log(error); 
}
 

}
exports.getProducts = async(req, res, next) => {

  const products=await Product.findAll();

  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  })}
 

exports.deleteProducts =async(req,res,next)=>{
    const proId=req.params.productId;

    await Product.destroy({where:{id:proId}});
    res.redirect('/admin/products');
}