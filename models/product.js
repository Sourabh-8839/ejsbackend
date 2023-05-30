
const db = require('../util/data');


module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id =id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    return db.execute('INSERT INTO products (title,imageUrl,price,description) VALUES(?,?,?,?)',
    [this.title,this.imageUrl,this.price,this.description]);
  } ;
  

  static fetchAll() {
      return db.execute('Select * from products');
   
  }

  static findById(id) {
   return db.execute('SELECT * from products where products.id=?',[id]);
  }

  static deleteById(id){
     db.execute('DELETE from products where products.id=?',[id]);
    }
};
