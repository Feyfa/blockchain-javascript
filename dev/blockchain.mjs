import sha256 from "sha256";
import { v4 as uuidv4 } from 'uuid';

const currentNodeUrl = process.argv[3];

function Blockchain() {
    this.chain = [];
    this.pendingTransaction = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transaction: this.pendingTransaction,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    this.pendingTransaction = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuidv4().split('-').join('')
    };

    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransaction = function (transactionObj) {
    this.pendingTransaction.push(transactionObj);

    return this.getLastBlock().index + 1;
}

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
    const data = `${previousBlockHash}${nonce.toString()}${JSON.stringify(currentBlockData)}`;
    const hash = sha256(data);
    return hash;
}

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
    // bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    // 1. repeatedly has block until itu find correct hash => '00000IANSYHSBSYG'
    // 2. uses current block data for the hash, but also the previousBlockHash
    // 3. continuously changes nonce value until it finds the correct hash
    // 4. retrurns to us the nonce value that creates the correct hash

    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0,4) != '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    
    return nonce;
}

Blockchain.prototype.chainIsValid = function (blockchain) {
    let validChain = true;

    for(let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];

        const currentBlockData = {
            transaction: currentBlock.transaction,
            index: currentBlock.index
        }
        const blockHash = this.hashBlock(prevBlock.hash, currentBlockData, currentBlock.nonce);

        if(blockHash.substring(0, 4) !== '0000') {
            validChain = false;
        }
        if(currentBlock.previousBlockHash !==  prevBlock.hash) { 
            validChain = false;
        }
    }

    // genesis block adalah block paling awal
    const genesisBlock = blockchain[0];
    const correctNonce = (genesisBlock.nonce === 100);
    const correctPreviousBlockHash = (genesisBlock.hash === '0');
    const correctHash = (genesisBlock.hash === '0');
    const correctTransactions = (genesisBlock.transaction.length === 0);

    if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) {
        validChain = false;
    }

    return validChain;
}

export default Blockchain;