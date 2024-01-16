// models.js
const mongoose = require('../db');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  description: String,
  token: String,
});

const User = mongoose.model("User", UserSchema);

//category modal
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});

const Category = mongoose.model('Category', categorySchema);

// models.js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  packsize: { type: Number, default: 0 },
  mrp: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
});

const Product = mongoose.model('Product', productSchema);



module.exports = {
  User,
  Category,
  Product,
};
