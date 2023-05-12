const usera_model = require("../model/user_model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;

class AccountController{

  information(req, res){
    return res.render('pages/information', { title: 'Account Information' });
  }

  store(req, res){
    return res.render('pages/register', { title: 'Register Store', layout: 'no-header-footer' });
  }

  async signUp(req, res){
    try {
      if (!req.body.email || !req.body.name || !req.body.password) {
        res.status(400).json({success: false , message: "Pass currect data", data: []});
        return;
      }
      const user = await usera_model.findOne({ email: req.body.email });
      if (user) {
        res.status(200).json({ success: false , message: "User Already Exists !", data: []});
        return;
      }
      const password = await bcrypt.hash(req.body.password, saltRounds);
      const data = { ...req.body, password };
      const userData = await usera_model.create(data);
      const token = await jwt.sign({ user }, "fake-jwt-secret");
      res.status(201).json(
        {
          success: true,
          message: "User Created Succefully ",
          data: {
            name: userData.name,
            email: userData.email,
            id: userData.id,
            access_token: token,
         },
        });
    } catch (error) {
      res.status(404).json({ success: false , message: "Something Went Wrong !", data: error });
    }
  }

  async logIn(req, res){
    try {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({success: false , message: "Pass currect data", data: []});
        return;
      }
      const user = await usera_model.findOne({ email: req.body.email });
      if (!user) {
        res.status(204).json({success: false , message: "User not found !", data: []});
        return;
      }
  
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        res.status(200).json({success: false , message: "Wrong password", data: [] });
        return;
      }
  
      const token = await jwt.sign({ user }, "fake-jwt-secret");
  
      res.status(201).json(
        {
          success: true,
          message: "User Successfully Logged ",
          data: {
            name: user.name,
            email: user.email,
            id: user.id,
            access_token: token,
          },
        }
        );
    } catch (error) {
      res.status(404).json({ success: false , message: "Something went worng !", data: error });
    }
  }
}

module.exports = new AccountController;


