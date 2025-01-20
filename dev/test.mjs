import Blockchain from "./blockchain.mjs";

const bitcoin = new Blockchain();

// Tambang Block Dan Buat Transaction
bitcoin.createNewBlock(892348, 'ASDFGH', 'QWERTY');
bitcoin.createNewTransaction(100, 'JED12345', 'FEYFA123456');

// Tambang Block Dan Buat Transaction
bitcoin.createNewBlock(123123, 'JLKNSWDD', 'PQSDDHJ');
bitcoin.createNewTransaction(10, 'JED12345', 'FEYFA123456');
bitcoin.createNewTransaction(20, 'JED12345', 'FEYFA123456');
bitcoin.createNewTransaction(50, 'JED12345', 'FEYFA123456');

// Tambang Block Dan Buat Transaction
bitcoin.createNewBlock(1243531, 'ASfahgs127', 'AHJKBAHKBV7');

console.log(bitcoin);