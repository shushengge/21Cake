const jwt = require("jsonwebtoken");
module.exports = function(req, res, next){

    let token = req.headers["authorization"];
    
    if(token){
        jwt.verify(token, "secret", (error, result) => {
            if(error){
                res.send({status:false, error:"authorization"});
            }else{
                next();
            }
        })
    }else{
        res.send({status:false, error:"authorization"});
    }
}