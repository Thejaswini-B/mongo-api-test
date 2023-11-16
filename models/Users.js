const mongoose = require('mongoose'); 

// Define a Mongoose schema for the "User" model
const UserSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    age: Number 
})

// Create a Mongoose model for the "User" schema, specifying the collection name ("users")
const UserModel = mongoose.model("users", UserSchema);

// Export the "UserModel" to make it accessible in other parts of the application
module.exports = UserModel;




// const mongoose = require('mongoose')

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number
// })

// const UserModel = mongoose.model("users", UserSchema)
// module.exports = UserModel