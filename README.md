const express = require('express');
const { engine  } = require('express-handlebars');
const path = require('path');
const route = require("./routes")
const morgan = require('morgan');
const Handlebars = require('handlebars');
const fs = require('fs');

const app = express()
const port = 3001

//logger
app.use(morgan("combined"))

//static file path
app.use(express.static(path.join(__dirname,'public')));

app.use("*", function(req, res, next){
  res.locals.absoluteUrl = `${req.protocol}://${req.get('host')}`; 
  next();
});

//db.connect();

//template engine
app.engine('.hbs', engine ({extname: '.hbs'}));
app.set('view engine','.hbs')
app.set('views', path.join(__dirname,'/source/views'));


route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})