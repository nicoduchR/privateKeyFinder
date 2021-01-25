const Web3 = require("web3")
const fetch = require('node-fetch');
const fs = require('fs');

// Docker
let web3js = new Web3('ws://blockchain:8546');

// Local
var minter = require('minterjs-wallet');
const express = require('express');
const app = express();

(function (delay, callback) {
	var loop = function () {
		callback();
		setTimeout(loop, delay);
	}; loop();
})(100, function () {
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

    var balance = await web3js.eth.getBalance(address);

    fs.appendFile(`./keys/addresses-${date_formatted}.txt`, `${address}, ${mnemonic}, ${privKey}, ${balance} \n`, async function (err) {
        if (err) throw err;
    });

    if(balance > 0){
        fs.appendFile(`./keys/not_empty_addresses-${date_formatted}.txt`, `${address}, ${mnemonic}, ${privKey}, ${balance} \n`, async function (err) {
            if (err) throw err;
        });
    }
}




app.get('/download', function(req, res){
    const file = `${__dirname}/keys/addresses.txt`;
    res.download(file); // Set disposition and send it.
});

app.get('/download-not-empty', function(req, res){
    const file = `${__dirname}/keys/not_empty_addresses.txt`;
    res.download(file); // Set disposition and send it.
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

