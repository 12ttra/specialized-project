class AccountController {
    login(req, res){
       return res.render('pages/login', { title: 'Login', layout: 'no-header-footer' });
    }

    register(req, res){
        return res.render('pages/register', { title: 'Register', layout: 'no-header-footer' });
    }

    information(req, res){
        return res.render('pages/information', { title: 'Account Information' });
    }

    store(req, res){
        return res.render('pages/register', { title: 'Register Store', layout: 'no-header-footer' });
    }
}

module.exports = new AccountController;