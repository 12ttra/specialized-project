const catalogRouter = require('./product');
const categoryRouter = require('./category');
const accountRouter = require('./account');

function route(app){
    //product
    app.use("/product",catalogRouter);
    app.use("/category",categoryRouter);
    app.use("/account",accountRouter);
    app.use('/admin/dashboard',(req, res)=>{
        res.render('admin/dashboard', { title: 'Dashboard', layout: 'admin' });
    })
    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route