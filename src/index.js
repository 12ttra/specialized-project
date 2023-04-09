require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const Category = require("./models/category");
var MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
const { engine  } = require('express-handlebars');
const route = require("./routes")
const morgan = require('morgan');


const app = express()
require("./config/passport");

// mongodb configuration
//connectDB(); 
mongoose.connect('mongodb+srv://tratran:Tra12@cluster0.pvzatmr.mongodb.net/Sprezza?retryWrites=true&w=majority', 
{

 useNewUrlParser: true,

 useUnifiedTopology: true

});

const db = mongoose.connection;




db.on('error', (err) => {

 console.error('Connect db err:', err);

});




db.once('open', () => {

 console.log('CONNECTED MONGOODB');

});

// view engine setup
app.set('views', path.join(__dirname,'/source/views'));
app.engine('.hbs', engine ({extname: '.hbs'}));
app.set('view engine','.hbs')

route(app);

// admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    //session expires after 3 hours
    cookie: { maxAge: 60 * 1000 * 60 * 3 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables across routes

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

//routes config
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/product");
const usersRouter = require("./routes/user");
const pagesRouter = require("./routes/page");
app.use("/product", productsRouter);
app.use("/user", usersRouter);
app.use("/page", pagesRouter);
app.use("/", indexRouter);

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

var port = process.env.PORT || 3001;
app.set("port", port);
app.listen(port, () => {
  console.log("Server running at port " + port);
});

module.exports = app;



//logger
app.use(morgan("combined"))

//static file path
app.use(express.static(path.join(__dirname,'public')));

app.use("*", function(req, res, next){
  res.locals.absoluteUrl = `${req.protocol}://${req.get('host')}`; 
  next();
});

module.exports = route

