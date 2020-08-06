const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

dotenv.config({path : './.env'})


app.use('/', require('./routes/routes'))

const port = process.env.PORT ||  8080

app.listen(port, ()=>{
    console.log(`Server is ready on port ${port}`);
})