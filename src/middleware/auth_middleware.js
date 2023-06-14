const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const userModel = require("../model/user_model");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "You must be logged in",
    });
  }
};

exports.isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({ error: "You are not authenticate" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    let reqUser = await userModel.findById(req.body.loggedInUserId);
    // If user role 0 that's mean not admin it's customer
    if (reqUser.userRole === 0) {
      res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch {
    res.status(404);
  }
};
 
const auth = async (req, res, next) => {
  if(req.headers && req.headers.authorization){
    try {
      const token = req.headers.authorization;
      await jwt.verify(token, JWT_SECRET);
      next();
    } catch (error) {
        res.status(401).json({error:'Unauthorized'});
    }
  }else{
    res.status(401).json({error:'headers error'});
  }
};
   
module.exports = auth;