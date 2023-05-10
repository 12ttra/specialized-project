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
    app.use('/admin/updateproduct',(req, res)=>{
        res.render('admin/updateproduct',{ title: 'edit product', layout: 'admin' });
    })
    app.use('/admin/order-grid',(req, res)=>{
        res.render('admin/order-grid',{ title: 'edit product', layout: 'admin' });
    })
    app.use('/admin/invoice-grid',(req, res)=>{
        res.render('admin/invoice-grid',{ title: 'edit product', layout: 'admin' });
    })
    app.use('/admin/shipment-grid',(req, res)=>{
        res.render('admin/shipment-grid',{ title: 'edit product', layout: 'admin' });
    })
    app.use('/admin/product-grid',(req, res)=>{
        res.render('admin/product-grid',{ title: 'edit product', layout: 'admin' });
    })
    app.use('/admin/customer-grid',(req, res)=>{
        res.render('admin/customer-grid',{ title: 'edit product', layout: 'admin' });
    })
    app.use('/admin/seller-grid',(req, res)=>{
        res.render('admin/seller-grid',{ title: 'edit product', layout: 'admin' });
    })
    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route