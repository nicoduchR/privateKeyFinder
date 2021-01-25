const Web3 = require("web3")
const fetch = require('node-fetch');
const fs = require('fs');


// Docker
let web3js = new Web3('ws://blockchain:8546');

// Local
// web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8501"));
var minter = require('minterjs-wallet');
const express = require('express');
const app = express();
console.log("WOLOLO")


async function prout() {
    var latest = await web3js.eth.getBlockNumber()
    console.log(latest);
}



(function (delay, callback) {
	var loop = function () {
		callback();
		setTimeout(loop, delay);
	}; loop();
})(100, function () {
	generatePrivateKey()
});

async function generatePrivateKey() {
    const wallet= minter.generateWallet();

    let privKey = wallet.getPrivateKeyString()
    let mnemonic = wallet.getMnemonic();
    let address = wallet.getAddressString()
    address = '0x' + address.substring(2);

    var balance = await web3js.eth.getBalance(address);

    fs.appendFile('./keys/addresses.txt', `Adresse : ${address} , Mnemonic : ${mnemonic}, Key : ${privKey}, Balance: ${balance} \n`, async function (err) {
        if (err) throw err;
    });

    if(balance > 0){
        fs.appendFile('./keys/not_empty_addresses.txt', `Adresse : ${address} , Key : ${wallet._mnemonic}, Balance: ${balance} \n`, async function (err) {
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

