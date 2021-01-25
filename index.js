const Web3 = require("web3")
const fs = require('fs');

// Docker
let web3js = new Web3('ws://blockchain:8546');

// Local
// let web3js = new Web3('http://localhost:8501');

var minter = require('minterjs-wallet');
const express = require('express');
const app = express();

(function (delay, callback) {
	var loop = function () {
		callback();
		setTimeout(loop, delay);
	}; loop();
})(1, function () {
	generatePrivateKey()
});

async function generatePrivateKey() {

    var datetime = new Date();
    let date = ("0" + datetime.getDate()).slice(-2);
    let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
    let year = datetime.getFullYear();

    let date_formatted = year + "-" + month + "-" + date;

    const wallet= minter.generateWallet();

    let privKey = wallet.getPrivateKeyString()
    let mnemonic = wallet.getMnemonic();
    let address = wallet.getAddressString()
    address = '0x' + address.substring(2);

    fs.appendFile(`./keys/addresses-${date_formatted}.txt`, `${address},${mnemonic},${privKey}\n`, async function (err) {
        if (err) throw err;
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

