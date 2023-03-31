
function route(app){
    
    app.use('/account/login',(req, res)=>{
        res.render('pages/login', { title: 'Login', layout: 'no-header-footer' });
    })
      
    app.use('/account/register',(req, res)=>{
        res.render('pages/register', { title: 'Register', layout: 'no-header-footer' });
    })

    app.use('/category/catalog-cart',(req, res)=>{
        res.render('pages/catelog-cart');
    })

    
    
    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route