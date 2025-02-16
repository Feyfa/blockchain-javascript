import express, { request } from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain.mjs";
import { v4 as uuidv4 } from 'uuid';
import rp from "request-promise";

const app = express();
const port = process.argv[2]; // mengambil argument port, di file pacakage.json -> scripts -> start 
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
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);
    res.json({ note: `transaction will be adde in block ${blockIndex}.` });
});

app.post('/transaction/broadcast', function (req, res) {
    const amount = req.body.amount;
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const newTransaction = bitcoin.createNewTransaction(amount, sender, recipient);
    bitcoin.addTransactionToPendingTransaction(newTransaction);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: `${networkNodeUrl}/transaction`,
            method: 'POST',
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
           .then(data => {
                res.json({ note: 'Transaction created and broadcast successfully.', data });
           })
           .catch(error => {
                res.json({ error });
           })
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
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: `${networkNodeUrl}/receive-new-block`,
            method: 'POST',
            body: { newBlock: newBlock },
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    console.log(requestPromises);

    Promise.all(requestPromises)
           .then(data => {
                const requestOptions = {
                    uri: `${bitcoin.currentNodeUrl}/transaction/broadcast`,
                    method: 'POST',
                    body: { amount: 12.5, sender: '00', recipient: nodeAddress },
                    json: true
                };

                return rp(requestOptions);
           })
           .then(data => {
                res.json({
                    note: `New Block Mine Successfully`,
                    block: newBlock
                });
           })
           .catch(error => {
                res.json({ error })
           }); 
});

app.post('/receive-new-block', function (req, res) {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = (lastBlock.hash === newBlock.previousBlockHash); // pengecekan terhadap hash
    const correctIndex = (lastBlock.index + 1 === newBlock.index); // pengecekan terhadap index
    
    if(correctHash && correctIndex) {
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransaction = [];
        res.json({ note: 'New Block Received And Accepted', newBlock: newBlock });
    } else {
        res.json({ note: 'New Block Rejected', newBlock: newBlock });
    }
});

// register a node  and broadcast it the network
app.post('/register-and-broadcast-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
        bitcoin.networkNodes.push(newNodeUrl);
    }

    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: `${networkNodeUrl}/register-node`,
            method: 'POST',
            body: {
                newNodeUrl: newNodeUrl
            },
            json: true,
        };

        regNodesPromises.push(rp(requestOptions));
    });

    Promise.all(regNodesPromises)
           .then(data => {
                const bulkRegisterOptions = {
                    uri: newNodeUrl + '/register-nodes-bulk',
                    method: 'POST',
                    body: {
                        allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ]
                    },
                    json: true
                }

                return rp(bulkRegisterOptions);
           })
           .then(data => {
                res.json({
                    note: 'New Node Register Successfully.'
                });
           })
           .catch(error => {
                res.json({ error })
           })
});

// register a node with network
app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) === -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

    if(nodeNotAlreadyPresent && notCurrentNode) {
        bitcoin.networkNodes.push(newNodeUrl);
    }

    res.json({
        newNodeUrl,
        nodeNotAlreadyPresent,
        notCurrentNode,
        note: 'New Node Register Successfully with node'
    });
});

// register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) === -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) {
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    });

    res.json({
        note: 'Bulk Register Successfully'
    });
});
/* ROUTE */



/* LISTEN */
app.listen(port, function() {
    console.log(`Running in port ${port}`);
});
/* LISTEN */