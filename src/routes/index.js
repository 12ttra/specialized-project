const accountRoutes = require("./account");
const catogoryRoutes = require("./category");
const subCategoryRoutes = require("./sub_category");
const productRoutes = require("./product");
const cartRoutes = require("./cart");
const favouriteRoutes = require("./favourite");
const flashSale = require("./flash_sale");

function route(app){
    //product
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
    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route