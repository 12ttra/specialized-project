const userModel = require("../model/user_model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const { toTitleCase, validateEmail } = require("../config/validator");

class AccountController{

  information(req, res){
    return res.render('pages/information', { title: 'Account Information' });
  }

  store(req, res){
    return res.render('pages/registerstore', { title: 'Register Store', layout: 'no-header-footer' });
  }
  
  getLogIn(req, res){
    return res.render('pages/login', { title: 'Account Login',layout: 'no-header-footer' });
  }

  getSignUp(req, res){
    return res.render('pages/register', { title: 'Account Register',layout: 'no-header-footer' });
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = { name: "",email: "",password: "",cPassword: ""};

    if(!name) {
      error.name = "Name must not be empty";
    // } else if(error.name.length > 3) {
    } else if(!toTitleCase(name)) {
      error.name = "Name must be greater than 3 character";
    }
    if(!email) {
      error.email = "Email must not be empty";
    } else if(!validateEmail(email)) {
      error.email = "Email is not correct format";
    } else{
      const data = await userModel.findOne({ email: email });
      if (data) {
        error.email = "Email already exists";
      }
    }
    if(!password) {
      error.password = "Password must not be empty";
    } else if((password.length > 255) || (password.length < 8)){
      error.password =  "Password must be greater than 8 charecter and less than 255";
    }
    if(!cPassword) {
      error.cPassword = "Confirm password must not be empty"
    }

    if(error.email != "" || error.cPassword != "" || error.password != "" || error.name != ""){
      return res.status(200).json(
        {
          status: 0,
          message: "Data is invalid",
          data: error
        }
      );
    }

    try {
      password = bcrypt.hashSync(password, 10);
      let newUser = new userModel({
        name,
        email,
        password,
        // ========= Here role 1 for admin signup role 0 for customer signup =========
        userRole: 1, // Field Name change to userRole from role
      });
      newUser
        .save()
        .then((data) => {
          return res.status(200).json({
            success: "Account create successfully. Please login",
          });
        }).catch((err) => {
          throw(err);
        });
      
    } catch (err) {
      return res.status(200).json(
        {
          status: 0,
          message: "Data is invalid",
          data: error
        }
      )
    }

    return res.status(200).json(
      {
        status: 1,
        message: "Success",
        data: {}
      }
    )
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    let error = { email: "",password: ""};
    
    if(!email) {
      error.email = "Email must not be empty";
    } else{
      const data = await userModel.findOne({ email: email });
      if (data) {
        error.email = "Email already exists";
      }
    }
    if(!password) {
      error.password = "Password must not be empty";
    }

    if(error.email != "" || error.password != ""){
      return res.status(200).json(
        {
          status: 0,
          message: "Data is invalid",
          data: error
        }
      );
    }

    try {
      const login = await bcrypt.compare(password, data.password);
      if (login) {
        const token = jwt.sign(
          { _id: data._id, role: data.userRole },
          JWT_SECRET
        );
        const encode = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({
          token: token,
          user: encode,
        });
      } else {
        return res.status(200).json(
          {
            status: 0,
            message: "Data is invalid",
            data: error
          }
        );
      }
    } catch (err) {
      return res.status(200).json(
        {
          status: 1,
          message: "Success",
          data: {}
        }
      )
    }

  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.status(200).json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.status(200).json({ success: "Password updated successfully" });
          });
        } else {
          return res.status(200).json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }
}

module.exports = new AccountController;


