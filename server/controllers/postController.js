var db = require('../config')

module.exports.createPost = (req, res) =>{
    var today = new Date();

    //Store user data in variable
    var post = {
        "title" : req.body.title,
        "content" : req.body.content,
        "created_by" : req.body.created_by,
        "created_at" : today,
    }

    //Insert user data in db
    db.query('INSERT INTO posts SET ?', post, function(error, results, fields){
        if(error){
            return res.json({
                status : false,
                err : "Cannot save new post in DB",
            })
        }
        else{
            return res.json({
                status : true,
                message : "Post uploaded successfully"
            })       
        }
    })
}

module.exports.showPosts = (req, res) =>{

    //Check if email entered by user exists in db
    db.query('SELECT * FROM posts', function (error, results, fields){
        if(error){
            return res.json({
                status : false,
                message : 'Error with showing posts Query'
            })
        }
        else{
            //If posts exist
            if(results.length > 0){
                    return res.json({
                        posts : results,
                        status : true,
                        message : "Sucessfull"
                    })
                }
                //if password doesnt match
                else{
                    return res.json({
                        status : false,
                        message : "No posts available."
                    })
                }
        }
    })
}