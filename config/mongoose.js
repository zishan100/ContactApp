/*Using Require Method to import Mongoose Library */
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Contact-ListApp_db');

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Connnection Error'));
db.once('open', function() {
    console.log('Successfully Connnected to DataBase');
  });