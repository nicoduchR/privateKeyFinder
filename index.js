const fs = require('fs');
const fetch = require('node-fetch');
var minter = require('minterjs-wallet');
const express = require('express');
const app = express();
const FormData = require('form-data');
let CronJob = require('cron').CronJob;



const MASTER_API_URL = process.env.MASTER_API_URL || "http://localhost:3001";
const WORKER_NAME = process.env.WORKER_NAME || "duduch2";

try {
    fetch(`${MASTER_API_URL}/api/1.0/register/${WORKER_NAME}`, { method: 'POST', body: {} })
    .then(res => res.json())
    .then(json => console.log(json));
} catch (error) {
    console.log(error)
}


(function (delay, callback) {
	var loop = function () {
		callback();
		setTimeout(loop, delay);
	}; loop();
})(1, function () {
	generatePrivateKey()
});


// Send last file every hour
var job = new CronJob('0 * * * *', function() { // https://www.npmjs.com/package/cron
    sendLastFile()
}, null);
job.start();



async function generatePrivateKey() {
    var datetime = new Date();
    let date = ("0" + datetime.getDate()).slice(-2);
    let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
    let year = datetime.getFullYear();
    let hours = datetime.getHours();

    let date_formatted = year + "-" + month + "-" + date + "-" + hours;

    const wallet= minter.generateWallet();

    let privKey = wallet.getPrivateKeyString()
    let mnemonic = wallet.getMnemonic();
    let address = wallet.getAddressString()
    address = '0x' + address.substring(2);

    fs.appendFile(`./keys/addresses-${date_formatted}.txt`, `${address},${mnemonic},${privKey}\n`, async function (err) {
        if (err) throw err;
    });
}

// sendLastFile()
async function sendLastFile() {
    var datetime = new Date();
    let date = ("0" + datetime.getDate()).slice(-2);
    let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
    let year = datetime.getFullYear();
    let hours = datetime.getHours();

    if(hours-1 < 0){
        var date_formatted = `${year}-${month}-${date-1}-23`;
    }else {
        var date_formatted = `${year}-${month}-${date}-${hours-1}`;
    }
    
    console.log(`./keys/addresses-${date_formatted}.txt`);


    fs.readFile(`./keys/addresses-${date_formatted}.txt`, (err, data) => {
        if (err) throw err;
        const form = new FormData();
        form.append('file', data);
        
        fetch(`${MASTER_API_URL}/api/1.0/upload/${WORKER_NAME}/addresses-${date_formatted}.txt`, { method: 'POST', body: form })
            .then(res => res.json())
            .then(json => console.log(json));
    });
}



app.get('/download/:date', function(req, res){
    const date = req.params.date
    const file = `${__dirname}/keys/addresses-${date}.txt`;
    res.download(file); // Set disposition and send it.
});

app.get('/download-not-empty/:date', function(req, res){
    const date = req.params.date
    const file = `${__dirname}/keys/not_empty_addresses-${date}.txt`;
    res.download(file);
});

app.listen(3000, () => console.log('Private key finder listening on port 3000!'));

