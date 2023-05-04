const checkoutRouter = require('./checkout');
const catalogRouter = require('./product');
const categoryRouter = require('./category');
const accountRouter = require('./account');

function route(app){
    //product
    app.use("/product",catalogRouter);
    app.use("/category",categoryRouter);
    app.use("/checkout",checkoutRouter);
    app.use("/account",accountRouter);
    app.get('/wishlist',(req, res)=>{
        res.render('pages/wishlist');
    })
    app.use('/admin/dashboard',(req, res)=>{
        res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
    })
    app.use('/admin/newproduct',(req, res)=>{
        res.render('admin/newproduct',{ title: 'New Product', layout: 'admin' });
    })
    
    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route