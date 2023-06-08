class ShopController{
    index(req, res){
        return res.render('pages/myshop', { title: 'My Store' });
      }
}

module.exports = new ShopController;