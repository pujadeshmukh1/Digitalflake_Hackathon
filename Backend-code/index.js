
// const express = require('express')
// const cors = require("cors")
// const bodyParser = require("body-parser")
// const mongoose = require('mongoose')
//  const app = express();
//  const port = 4000;

//  app.use(express.json());
//  app.use(bodyParser.json());
//  app.use(cors());



//  mongoose.connect("mongodb://localhost:27017/e-commers", { 
// //   useNewUrlParser: true, 
// //   useUnifiedTopology: true
//  })
//   .then(() => {
//     console.log("Connected to the server");
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the server:", error.message);
//   });

// // Define the schema for your collection
// const UserSchema = new mongoose.Schema({
//    email: String,
//   password: String,
//   description: String,
//   token: String,
// });

// // Create the Mongoose model based on the schema
// const User = mongoose.model("User", UserSchema);

// // Route to handle login and save the token
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Make a request to the dummyjson.com authentication API
//     const response = await fetch('https://dummyjson.com/auth', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     const token = data.token;

//     // Save the new document to the database
//     const newUser = new User({
//       email:email ,
//       password :password ,
//       token,
//     });

//     await newUser.save();
//     console.log('Saved User:', newUser); // Log the saved document to the console

//     res.json({ token });
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     res.status(401).json({ error: "Authentication failed" });
//   }
// });

// app.listen(port, (req, res)=>{
//     console.log("connent server")
// })


// index.js
const app = require('./routes/login');

const port = 4000; 

app.listen(port, () => {
  console.log("Connected server");
});



