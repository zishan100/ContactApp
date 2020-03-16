/*To Import Express Modules Using Require Method  */
const express = require("express");
const path = require("path");
const port = 1200;
/* Here Import MongoDB Library to Set a  Connection B/w Application &  Database */
const db = require("./config/mongoose");
/* Here We Import Contact Schema  */
const Contact = require("./Modals/contact");
/*Here we collect Express Method Using App Variable*/
const app = express();
/* Here Express Modules function is used  convert from urlencoded data into  readable data */
app.use(express.urlencoded());
/*Here Express Library Static Function is used  to Access the Static(Assets) File */
app.use(express.static("Assets"));
//MiddleWare Function 1
// app.use(function(req,res,next){
//       req.myname={
//          name:'Ravi'

//       }
//       console.log("This is MiddleWare One");
//       next();
// });
// MiddleWare Function Two
// app.use(function(req,res,next){
//      req.myname='Ravi';
//      console.log("MiddleWare Two Name",req.myname);
//      next();
// })
/*Here Using Express Function to Set Template Engine EJS*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
/*Here we Created Contact Array List */
var ContactList = [
  {
    name: "Ravi",
    phone: "11111111"
  },
  {
    name: "Suresh",
    phone: "1234567890"
  },
  {
    name: "Ramesh",
    phone: "23356677"
  }
];
/*Here we Create Expresss Get request to get Data From Server*/
app.get("/", function(req, res) {
  //  using 'find()' function we can Fecthing data From database
  Contact.find({}, function(err, contacts) {
    if (err) {
      console.log("Error in Fetching Contacts");
      return;
    }
    return res.render("ContactPage", {
      title: "Contact-ListApp",
      Contact_List: contacts
    });
  });
  // return res.render("ContactPage", {
  //   title: "Contact-ListApp",
  //   Contact_List: Contact
  // });
});
app.get("/indexPage", function(req, res) {
  return res.render("indexPage", {
    title: "Contact-ListApp"
  });
});

/*Function is Created to Delete Contact */
app.get("/delete-contact/", function(req, res) {
  console.log(req.query.id);
  //   let phoneno=req.query.phone;
  //   let contactIndex=ContactList.findIndex(contact=> contact.phone==phoneno);
  // if(contactIndex!=-1){
  //   ContactList.splice(contactIndex,1);
  // }

  /*find the contact in the DataBase using id &Delete */

  const id = req.query.id;
  Contact.findByIdAndDelete(id, function(err) {
    if (err) {
      console.log("Error in Deleting a data from DataBase ", err);
      return;
    }
    return res.redirect("/");
  });
});
/*Here Using Express (Post) Method  for Storing ContactList into Server*/

app.post("/ContactList", function(req, res) {
  //console.log(req.body);
  // ContactList.push(
  //     {
  //       name:req.body.name,
  //       phoneno:req.body.phoneno
  //     }
  // )
  //ContactList.push(req.body);
  /*  create() function is used to Stored data into DataBase Permanently */

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone
    },
    function(err, newContact) {
      if (err) {
        console.log("Error in Creating Contact");
        return;
      }
      console.log("*******", newContact);
      return res.redirect("back");
    }
  );

  //  console.log(req.body.name);
  //  console.log(req.body.phone);

  //      return res.redirect('/');
});
/* Using Express Listen Method to Creating Server */
app.listen(port, function(err) {
  if (err) {
    console.log("Error in Running on server", err);
  }
  console.log("Expres Js Server is Running on Port", port);
});
