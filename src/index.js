const express = require("express");
const app = express();
const port = 3001;
const route = require("./routes");
const connectDb = require("./config/db/mongo");
const { engine  } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const Handlebars = require('handlebars');
const fs = require('fs');
const { checkOverload } = require("./helpers/check.connect")

app.use(express.json());

checkOverload()

//logger
app.use(morgan("combined"))
app.use(compression())

//static file path
app.use(express.static(path.join(__dirname,'public')));
app.use("*", function(req, res, next){
  res.locals.absoluteUrl = `${req.protocol}://${req.get('host')}`; 
  next();
});

 //template engine
app.engine('.hbs', engine ({extname: '.hbs'}));
app.set('view engine','.hbs')
app.set('views', path.join(__dirname,'/source/views'));

route(app);

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

connectDb().then(() =>
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  })
);

