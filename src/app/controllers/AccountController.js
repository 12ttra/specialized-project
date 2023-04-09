class AccountController {
    register(req, res){
       return res.render('pages/login', { title: 'Login', layout: 'no-header-footer' });
    }

    login(req, res){
        return res.render('pages/register', { title: 'Register', layout: 'no-header-footer' });
    }

    information(req, res){
        return res.render('pages/information', { title: 'Account Information' });
    }
}

module.exports = new AccountController;