const accountRoutes = require("./account");
const catogoryRoutes = require("./category");
const subCategoryRoutes = require("./sub_category");
const productRoutes = require("./product");
const cartRoutes = require("./cart");
const favouriteRoutes = require("./favourite");
const flashSale = require("./flash_sale");
const shopRoutes = require("./shop")
const checkoutRoutes = require("./checkout")
const adminRouter = require("./admin/index");
const homeRouter = require("./home");
const orderRouter = require("./order");

function router(app){

    app.use("/home", homeRouter);
    app.use("/product", productRoutes);
    app.use("/account", accountRoutes);
    app.use("/category", catogoryRoutes);
    app.use("/subCategory",subCategoryRoutes)
    app.use("/cart", cartRoutes);
    app.use("/favourite", favouriteRoutes);
    app.use("/flashsale", flashSale);
    app.use("/checkout", checkoutRoutes);
    app.use("/myshop", shopRoutes);
    app.use("/order", orderRouter);
    app.get('/wishlist',(req, res)=>{
        res.render('pages/wishlist');
    })
    app.use("/admin", adminRouter)

    
   
    
   

    
  
}
module.exports = router ;
