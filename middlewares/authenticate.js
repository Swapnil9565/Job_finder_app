
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const authenticateUser=(req,res,next)=>{
      const token = req.headers.authorization;
      if(!token){
        return res.status(400).json({message:"These action is not allowed"});
      }
      try {
       const decoded=jwt.verify(token,process.env.JWT_SECRET)
               req.user=decoded;
               next();
          } catch (error) {
        return  res.status(401).json({ message: "Invalid or expired token" });
      }
}

module.exports=authenticateUser;