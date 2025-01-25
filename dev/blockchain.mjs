import sha256 from "sha256";

function Blockchain() {
    this.chain = [];
    this.pendingTransaction = [];

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
    };

    this.pendingTransaction.push(newTransaction);

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
    
    return {
        nonce: nonce,
        hash: hash
    };
}

export default Blockchain;