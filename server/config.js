const mysql = require('mysql')

//DB Connection parameters
const db = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD ,
    database : process.env.DB
})



//DB connection
db.connect((err, res)=>{
    if(err){
      console.log(err);  
    }
    else{
        var check1 = "SELECT * FROM fb.tables where table_name='users'"
        var check2 = "SELECT * FROM fb.tables where table_name='posts'"
        if(check1){
        }
        else{
            var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at DATETIME)";
            db.query(sql, function (err, result) {
            
        });
    }
        if(check2){
        }
        else{
            var sql = "CREATE TABLE posts (idposts INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), content VARCHAR(255),  created_by VARCHAR(255), created_at DATETIME)";
            db.query(sql, function (err, result) {
             
        });
        }
        console.log("CONNECTED TO DB");
}
})



module.exports = db;