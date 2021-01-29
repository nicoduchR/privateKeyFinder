const Web3 = require("web3")
const fetch = require('node-fetch');
const fs = require('fs');

// Docker
// let web3js = new Web3('ws://blockchain:8546');

// Local
let web3js = new Web3('http://localhost:8501');
var minter = require('minterjs-wallet');
const express = require('express');
const app = express();

// (function (delay, callback) {
// 	var loop = function () {
// 		callback();
// 		setTimeout(loop, delay);
// 	}; loop();
// })(1, function () {
// 	generatePrivateKey()
// });

// async function generatePrivateKey() {

//     const wallet= minter.generateWallet();
//     let address = wallet.getAddressString()
//     address = '0x' + address.substring(2);

//     var balance = await web3js.eth.getBalance(address);
//     console.log(address, balance)
// }


// const lineReader = require('line-reader');


var start = new Date()

    // read contents of the file
    const data = fs.readFileSync('./keys/addresses-2021-01-27-22-19.txt', 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach(async (line) => {
        const address = line.split(',')[0];
        if(address.length != 0){
            // console.log(address.length);

            var balance = web3js.eth.getBalance(address);
            console.log(balance);
        }

    });


// try {

// } catch (err) {
//     console.error(err);
// }

var end = new Date() - start
console.info('Execution time: %dms', end)




// var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws');

// var subscription1 = web3.eth.subscribe('logs', {
//     address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
// }, function (error, result) {
// })
// .on("data", function (log) {
//     //console.log(log);
//     web3.eth.getTransaction(log.transactionHash)
//         .then(function (transaction) {
//             //console.log(transaction)
//             if (transaction.value > 0) {
//                 console.log("Ether sent from " + transaction.from + " to " + transaction.to)
//             }
//         })
// })



// https://medium.com/coinmonks/monitoring-an-ethereum-address-with-web3-js-970c0a3cf96d