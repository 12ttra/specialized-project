require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes");
const connectDb = require("./config/db/mongo");
const { engine  } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const Handlebars = require('handlebars');
const fs = require('fs');
const passport = require('passport');
const flash = require("connect-flash");
const { checkOverload } = require("./helpers/check.connect")
checkOverload()
require("./config/passport");
const Category = require("./model/category_model");

route(app);

//init middlewares
app.use(morgan("combined"))
app.use(compression())
app.use(express.json());


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


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    const categories = await Category.find({}).sort({ title: 1 }).exec();
    res.locals.categories = categories;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// add breadcrumbs
get_breadcrumbs = function (url) {
  var rtn = [{ name: "Home", url: "/" }],
    acc = "", // accumulative url
    arr = url.substring(1).split("/");

  for (i = 0; i < arr.length; i++) {
    acc = i != arr.length - 1 ? acc + "/" + arr[i] : null;
    rtn[i + 1] = {
      name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
      url: acc,
    };
  }
  return rtn;
};
app.use(function (req, res, next) {
  req.breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connectDb().then(() =>
  app.listen(port = process.env.PORT || 3001, () => {
    console.log(`Server is running at ${port}`);
  })
);

