// require library
const mongoose =  require("mongoose");

// connect to db
mongoose.connect('mongodb://localhost/contacts');

// acquire the connection to check if it is successful
const db = mongoose.connection;

// if error:
db.on('error', console.error.bind(console, 'Connection Error'));

// if successful (up and running):
db.once('open', function(){
    console.log("Successfully Connected to DB!")
})