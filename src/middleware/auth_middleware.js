const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if(req.headers && req.headers.authorization){
    try {
      const token = req.headers.authorization;
      await jwt.verify(token,'sprezza-secret');
      next();
    } catch (error) {
        res.status(401).json({error:'Unauthorized'});
    }
  }else{
    res.status(401).json({error:'headers error'});
  }
};
   
module.exports = auth;
 