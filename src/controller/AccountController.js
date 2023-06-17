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
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "",
        email: "",
        password: "",
        cPassword: "",
      };
      return res.status(200).json({status: 0, message:"Error", data: { error }});
    }

    if(!name) {
      error = {error, name : "Filed must not be empty"}
    }
    if(!email) {
      error = {error, name : "Filed must not be empty"}
    }
    if(!password) {
      error = {error, name : "Filed must not be empty"}
    }
    if(!cPassword) {
      error = {error, name : "Filed must not be empty"}
    }

    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.status(200).json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.status(200).json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.status(200).json({ error });
            } else {
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
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.status(200).json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.status(200).json({
          error: "Invalid email or password",
        });
      } else {
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
          return res.status(200).json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
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


