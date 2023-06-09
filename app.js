const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/data');
const app = express();


const Product = require('./models/product');
const User = require('./models/user');
const cart = require('./models/cart');
const cartItem= require('./models/cart-Item');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { where } = require('sequelize');

app.use( async(req,res,next)=>{

    const user = await User.findByPk(1);
    // console.log(user);
    req.user=user;
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});

User.hasMany(Product);

User.hasOne(cart);
cart.belongsTo(User);

cart.belongsToMany(Product,{through:cartItem});
Product.belongsToMany(cart,{through:cartItem});
sequelize.
// sync({force:true})
sync().
then(res=>{
    return User.findByPk(1);
    })
    .then(user =>{
        // console.log(user);
        if(!user){
         return User.create({userName:"hemant",email:"sourabhsingh8839@gmail.com"});
        }

        return user;
        
    }).then(user=>{
        // console.log(user);
        user.createCart();

        
    }).
    then(user=>{
        app.listen(3000);
    }).
catch(err=>console.log(err));

