const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (res, res, next) => {
  try {
    //authentication check kaise?--with the help of jwt
    //token extract krne k teen tarike-->
    // i)cookie,ii)body,iii)bearerToken
    //safest tarike--->bearertoken, most unsafe-->cookie

    //extracting token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer", "");

    //if token missing,return 401
    if (!token) {
      return res.status(401).json({
        successs: false,
        message: "Token is missing!",
      });
    }

    //token received, now verify it
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;//req k andar role add kr dia
    } catch (error) {
      //issue in verification
      return res.status(401).json({
        successs: false,
        message: "Token is Invalid!",
      });

    }
    next();
  }

   catch (error) {
    return res.status(401).json({
        successs: false,
        message: "Somwething went wrong while  vailidating",
      });
   }

};


//isstudent
exports.isStudent=async(req,res,next)=>{
    try {
        if(req.body.accountType!=='Student'){
            return res.status(401).json({
                successs: false,
                message: "This is a protected route for students only",
              });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: "User Role cannot be verified, please try again",
          });
    }
}


//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.body.accountType!=='Instructor'){
            return res.status(401).json({
                successs: false,
                message: "This is a protected route for Instructors only",
              });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: "User Role cannot be verified, please try again",
          });
    }
}

//is admin
exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.body.accountType!=='Admin'){
            return res.status(401).json({
                successs: false,
                message: "This is a protected route for Admin only",
              });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: "User Role cannot be verified, please try again",
          });
    }
}
