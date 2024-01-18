// routes.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
 // Use the .default property

const { User, Category, Product } = require('../modules/loginModules');

const app = express();

//middl
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await fetch('https://dummyjson.com/auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const token = data.token;

    const newUser = new User({
      email,
      password,
      token,
    });

    await newUser.save();
    console.log('Saved User:', newUser);

    res.json({ token });
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ error: "Authentication failed" });
  }
});


//routes Category 
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ status: "success", data: categories, message: "Categories retrieved successfully" });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for get" });
  }
});

app.post("/categories", async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const newCategory = new Category({ name, description, status });
    await newCategory.save();
    console.log('Saved Category:', newCategory);
    res.json({ status: "success", data: newCategory, message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for post" });
  }
});

// Category delete route
app.delete("/categories/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }

    res.json({ status: "success", data: deletedCategory, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for delete" });
  }
});

// Category update route
app.put("/categories/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name, description, status } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description, status },
      { new: true } 
    );

    if (!updatedCategory) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }

    res.json({ status: "success", data: updatedCategory, message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for put" });
  }
});


// Product routes
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: "success", data: products, message: "Products retrieved successfully" });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for get" });
  }
});

// Product routes
// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post("/products", upload.single('image'), async (req, res) => {
  const { name, category, packsize, mrp, status } = req.body;

  try {
    // Access the uploaded file information
    const file = req.file;
    let imagePath = null;
    if (file) {
      // If a file was uploaded, you can access its details like file.path
      imagePath = req.protocol + '://' + req.get('host') + '/uploads/' + file.filename;
    }

    const newProduct = new Product({
      name,
      category,
      packsize,
      mrp,
      image: imagePath,
      status,
    });

    await newProduct.save();
    console.log('Saved Product:', newProduct);

    res.json({ status: "success", data: newProduct, message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for post" });
  }
});
// app.post("/products", async (req, res) => {
//   const { name, category, packsize, mrp, image, status } = req.body;

//   try {
//     const newProduct = new Product({ name, category, packsize, mrp, image, status });
//     await newProduct.save();
//     console.log('Saved Product:', newProduct);

//     res.json({ status: "success", data: newProduct, message: "Product created successfully" });
//   } catch (error) {
//     console.error("Error creating product:", error.message);
//     res.status(500).json({ status: "error", message: "Internal Server Error for post" });
//   }
// });


app.delete("/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    res.json({ status: "success", data: deletedProduct, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error for delete" });
  }
});




module.exports = app;
