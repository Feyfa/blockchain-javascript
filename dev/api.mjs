import express from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain.mjs";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const bitcoin = new Blockchain();
const nodeAddress = uuidv4().split('-').join('');

/* MIDDLEWARE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* MIDDLEWARE */



/* ROUTE */
app.get('/blockchain', function(req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
    const amount = req.body.amount;
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);

    res.json({
        note: `Transaction will be added in block ${blockIndex}`,
    });
});

app.get('/mine', function(req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock.hash;
    const currentBlockData = {
        transaction: bitcoin.pendingTransaction,
        index: lastBlock.index + 1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: `New Block Mine Successfully`,
        block: newBlock
    });
});
/* ROUTE */



/* LISTEN */
app.listen(3000, function() {
    console.log(`Running in port ${30000}`);
});
/* LISTEN */