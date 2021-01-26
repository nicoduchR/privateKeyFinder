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

const HOST = process.env.HOST;
const HTTP_PORT = 3001;
  
app.post('/api/1.0/register/:name', function (req, res) {
    let name = req.params.name;
    if (name == undefined){
        res.status(400).json(errorResponse("You need to pass a name in url", res.statusCode));
    }

    if(fs.existsSync(`./generators/${name}`)){
        res.status(400).json(errorResponse("You are already registered", res.statusCode));
    }else{
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
    }
});

app.get('/jackpot/', function(req, res){
    const file = `${__dirname}/generators/jackpot/jackpot.txt`;
    res.download(file); // Set disposition and send it.
});


app.post('/api/1.0/upload/:name/:filename', async (req, res) => {
    
    let name = req.params.name;
    let filename = req.params.filename;

    console.log(`UPLOAD CALLED FROM ${name}`);

   

    if (name == undefined || filename == undefined){
        res.status(400).json(errorResponse("You need to pass a name and a filename in url: /upload/name/filename", res.statusCode));
    }

    try {
        
        if(!req.files) {
            res.status(400).json(errorResponse("ERROR: No file uploaded", res.statusCode));
        } else {
            // Retrieve file from request. Must be multipart/form-data request
            let data = req.files.file.data;

            try {
                fs.appendFile(`./generators/${name}/${filename}`, data, async function (err) {
                    if (err) throw err;
                });
            } catch (error) {
                res.status(400).json(errorResponse("You need to register first", res.statusCode));
            }

            //send response
            res.setHeader('Content-Type', 'application/json');
            res
            .status(200)
            .json(success("OK", {
                name: data.name,
                mimetype: data.mimetype,
                size: data.size
            }, res.statusCode));
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(HTTP_PORT, () => console.log('Master listening on port 3001!'));