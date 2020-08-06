var db = require('../config')
var jwt = require("jsonwebtoken");
var crypto = require('crypto'), algorithm = 'aes-256-ctr';


//Signup COntroller
module.exports.signup = (req, res) =>{
    var today = new Date();

    //Store user data in variable
    var users = {
        "name" : req.body.name,
        "lastname" : req.body.lastname,
        "email" : req.body.email,
        "password" : encrypt(req.body.password),
        "created_at" : today,
    }

    //Insert user data in db
    db.query('INSERT INTO users SET ?', users, function(error, results, fields){
        if(error){
            return res.json({
                status : false,
                err : "Cannot save ew user in DB",
            })
        }
        else{
            return res.json({
                status : true,
                message : "User registered successfully"
            })       
        }
    })
}

module.exports.login = (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;

    //Check if email entered by user exists in db
    db.query('SELECT * FROM users where email = ?',[email], function (error, results, fields){
        if(error){
            return res.json({
                status : false,
                message : 'Error with login Query'
            })
        }
        else{
            //If user exist
            if(results.length > 0){
                //check password match
                if(password === decrypt(results[0].password)){
                    //create token
                    const token = jwt.sign({ id: results[0].id }, process.env.SECRET);
                    //put token in cookie
                    res.cookie("token", token, { expire: new Date() + 9999 });
                    const {id, name, lastname, email} = results[0];

                    return res.json({
                        token,
                        user : {id, name, lastname, email},
                        status : true,
                        message : "User authentication sucessfull"
                    })
                }
                //if password doesnt match
                else{
                    return res.json({
                        status : false,
                        message : "Email and Password does not match."
                    })
                }
        }
        //If user doesn't exist
        else{
            return res.json({
                status : false,
                message : 'Email does not exist, Please register with this email.'
            })
        }
    }
    })
}

//Signout user
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });
};


//Encription
function encrypt(text){
    var cipher = crypto.createCipher(algorithm, process.env.SECRET)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
//Decription  
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm, process.env.SECRET)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }