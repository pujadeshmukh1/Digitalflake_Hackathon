// db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Digitalflake", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to the server");
  })
  .catch((error) => {
    console.error("Failed to connect to the server:", error.message);
  });

module.exports = mongoose;
