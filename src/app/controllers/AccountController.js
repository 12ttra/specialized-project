class AccountController {
    login(req, res){
       return res.render('pages/login', { title: 'Login', layout: 'no-header-footer' });
    }

    register(req, res){
        return res.render('pages/register', { title: 'Register', layout: 'no-header-footer' });
    }

    store(req, res){
        return res.render('pages/register-store', { title: 'Register Store', layout: 'no-header-footer' });
    }

    information(req, res){
        return res.render('pages/information', { title: 'Account Information' });
    }
}

module.exports = new AccountController;