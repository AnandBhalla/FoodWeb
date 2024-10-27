import jwt from 'jsonwebtoken'

const authMiddleware=async (req,res,next)=>{

    const {token}=req.headers;
    const secret=process.env.JWT_SECRET;
    if(!token)  return res.json({success:false,message:"Not Authorised"})
    const tokenDecode=jwt.verify(token,secret);
    req.body.userId = tokenDecode.id;
    next();
}

export default authMiddleware;