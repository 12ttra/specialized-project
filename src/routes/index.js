
function route(app){
    app.use('/account/login',(req, res)=>{
        res.render('pages/login', { title: 'Login', layout: 'no-header-footer' });
    })
    app.get('/', (req, res) => {
        res.render('home');
    })
}

module.exports = route