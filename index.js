const express = require('express');
const path = require('path');
const port = 9000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

// view engine setup for html file (sending data from server to ejs file)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware to use static asset files
app.use(express.static('assets'));

// .use method is for using middlewares 
// Middleware: function which has access to request and response data
// Middleware can analyse, manipulate and pre-process data
// Example: forms data is converted into key-value pairs from encoded data using express.urlencoded()
app.use(express.urlencoded());

// custom middleware 1 (to print something on console)
// next --> passes on the changes to next middleware or the controller if no middleware
app.use(function(req, res, next){
    console.log("Middleware 1 called");
    // call next(), otherwise the screen/flow will get stuck
    next();
});

// custom middleware 2
app.use(function(req, res, next){
    console.log("Middleware 2 called");
    next();
});

// array of contacts for storing new contacts
var contactList = [
    {
        name: 'Pankhuri',
        number: '9810102729'
    },
    {
        name: "Dimpy",
        number: "1010827392"
    },
    {
        name: "Billa",
        number: "9820748921"
    }
]

// /home is route and (req, res) is controller function
app.get('/home', (req, res) =>{
    // res.send("<h1> hello ji supp </h1>");

    return res.render('home', {
        title: "Contacts List",
        contact_list: contactList
    });
});

// Method 1 using String Params
app.get('delete-contact/:phone', (req, res)=>{

    // get phone number from the req url which user wants to delete using params
    let phone = req.params.phone;  
    // or let phone = req.params  (because the only params mentioned in URL is phone by default)

    // find the index of the contact (to be deleted) which matches the number in the contact list
    let contactIndex = contactList.findIndex(contact => contact.number == phone);

    // if the contact exists (i.e. it doesn't return -1), then splice it out
    if(contactIndex!=-1){
        contactList.splice(contactIndex, 1);
    }

    // go back to the home page (back)
    return res.redirect('back');

});

// Method 2 using String Query
app.get('/delete-contact', (req, res)=>{

    // get phone number from the req url which user wants to delete using query
    let phone = req.query.phone;

    // find the index of the contact (to be deleted) which matches the number in the contact list
    let contactIndex = contactList.findIndex(contact => contact.number == phone);

    // if the contact exists (i.e. it doesn't return -1), then splice it out
    if(contactIndex!=-1){
        contactList.splice(contactIndex, 1);
    }

    // go back to the home page (back)
    return res.redirect('back');
});

app.post('/create-contact', (req, res)=>{
    
    contactList.push(req.body);
    return res.redirect('back');
});

// fire up the server by listening on the given port
app.listen(port, (err) => {
    if(err){
        console.log("Error", err);
    }
    else{
        console.log("Server is up and running on port:", port);
    }
});
