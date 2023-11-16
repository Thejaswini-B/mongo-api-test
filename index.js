const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

const dbConnection = mongoose
  .connect(
    "mongodb+srv://Roshan:Roshan786@cluster0.eoiy197.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log("Err while connecting to db"));

//   ******************************************
// Define a route that handles GET requests at the root URL ("/")
app.get("/", (req, res) => {
  // Find all users in the UserModel
  UserModel.find({})
    .then((users) => res.json(users)) // Send a JSON response with the found users
    .catch((err) => res.json(err)); // Handle any errors and send them as JSON responses
});

// Define a route that handles GET requests with a dynamic parameter for user ID ("/getUser/:id")
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id; // Extract the user ID from the URL parameter
  // Find a user by their ID in the UserModel
  UserModel.findById({ _id: id })
    .then((users) => res.json(users)) // Send a JSON response with the found user
    .catch((err) => res.json(err)); // Handle any errors and send them as JSON responses
});

// Define a route that handles PUT requests with a dynamic parameter for user ID ("/updateUser/:id")
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id; // Extract the user ID from the URL parameter
  // Update a user by their ID in the UserModel with the data provided in the request body
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((users) => res.json(users)) // Send a JSON response with the updated user
    .catch((err) => res.json(err)); // Handle any errors and send them as JSON responses
});

// Define a route that handles DELETE requests with a dynamic parameter for user ID ("/deleteUser/:id")
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id; // Extract the user ID from the URL parameter
  // Find and delete a user by their ID in the UserModel
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users)) // Send a JSON response with the deleted user
    .catch((err) => res.json(err)); // Handle any errors and send them as JSON responses
});

// Define a route that handles POST requests to create a new user ("/createUser")
app.post("/createUser", (req, res) => {
  // Create a new user in the UserModel using the data provided in the request body
  UserModel.create(req.body)
    .then((users) => res.json(users)) // Send a JSON response with the created user
    .catch((err) => res.json(err)); // Handle any errors and send them as JSON responses
});

app.listen(3001, () => {
  console.log("Server is Running", 3001);
});

module.exports = { dbConnection, app };

// app.get('/',  (req, res) => {
//     UserModel.find({})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.get('/getUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({_id:id})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))

// })

// app.put('/updateUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({_id:id}, {
//         name: req.body.name,
//         email:req.body.email,
//         age:req.body.age})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))

// })

// app.delete('/deleteUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({_id:id})
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.post("/createUser",  (req, res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })

// app.listen(3001, () => {
//     console.log("Server is Running")
// })
