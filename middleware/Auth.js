const res = require("express/lib/response");
const { verify} = require("jsonwebtoken");

const validateToken = (req,res,next) => {
  const accessToken = req.header("accessToken")

  if(!accessToken) return res.json({error: "User not logged In..!"});

  try {
        const validToken = verify(accessToken, "importantsecret");

        if(validToken){
            return next();
        }
  } catch (err){
      return res.json({error: err})
  }
}

const authUser = (req, res, next) => {
  if(req.user === null) {
    res.status(403)
    return res.send('You need to Sign in')
  } else {
    next()
  }

}

const authRole = (req, res, next) => {
  return (req, res, next) => {
    if(req.user.role !== role) {
      res.status(401);
      return res.send('Your not allowed');
    } else {
      next();
    }
  }
}




module.exports = { validateToken, authUser, authRole}