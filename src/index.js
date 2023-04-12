const express = require("express");
const app = express();
const port = 3001;
const accountRoutes = require("./routes/account");
const catogoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/sub_category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const favouriteRoutes = require("./routes/favourite");
const flashSale = require("./routes/flash_sale");
const connectDb = require("./config/db/mongo");

app.get("/", (req, res) => {
  res.status(200).send("Server Running Successfully");
});

app.use(express.json());

app.use("/product", productRoutes);
app.use("/account", accountRoutes);
app.use("/category", catogoryRoutes);
app.use("/subCategory",subCategoryRoutes)
app.use("/cart", cartRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/flashsale", flashSale);

app.use('/admin/dashboard',(req, res)=>{
  res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
})

/*app.get('/', (req, res) => {
  res.render('home');
})*/

app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

connectDb().then(() =>
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  })
);
