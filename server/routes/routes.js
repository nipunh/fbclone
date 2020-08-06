const express = require('express')
const router = express.Router();

const {login, signup, signout} = require('../controllers/authController');
const {createPost, showPosts} = require('../controllers/postController')

router.get('/', (req, res)=>{
    res.json({ message: 'welcome to our upload module apis' });
})

//Signup Route
router.post('/api/signup', signup);

//Login Route
router.post('/api/login', login);

//Signout Route
router.get("/api/signout", signout)

// Create Post
router.post("/api/post/create",createPost)

//Show Post
router.get("/api/post/show",showPosts)

module.exports = router;