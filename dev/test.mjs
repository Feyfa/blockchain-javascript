import Blockchain from "./blockchain.mjs";

const bitcoin = new Blockchain();

/* --------------------------------------------- */
// // Tambang Block Dan Buat Transaction
// bitcoin.createNewBlock(892348, 'ASDFGH', 'QWERTY');
// bitcoin.createNewTransaction(100, 'JED12345', 'FEYFA123456');

// // Tambang Block Dan Buat Transaction
// bitcoin.createNewBlock(123123, 'JLKNSWDD', 'PQSDDHJ');
// bitcoin.createNewTransaction(10, 'JED12345', 'FEYFA123456');
// bitcoin.createNewTransaction(20, 'JED12345', 'FEYFA123456');
// bitcoin.createNewTransaction(50, 'JED12345', 'FEYFA123456');

// // Tambang Block Dan Buat Transaction
// bitcoin.createNewBlock(1243531, 'ASfahgs127', 'AHJKBAHKBV7');

// console.log(bitcoin);
/* --------------------------------------------- */



/* --------------------------------------------- */
const previousBlockHash = 'KSA1231SAQWKDLSSA';
const currentBlockData = [
    {
        amount: 10,
        sender: 'JHKSKJHS778A',
        recipient: 'KJHKV786HJKV'
    },
    {
        amount: 30,
        sender: 'JHKSKJHS778',
        recipient: 'NCVNCBS918'
    },
    {
        amount: 50,
        sender: 'ASWWEQEQW33541',
        recipient: 'MUHYHGTGATA515'
    },
];

// process untuk match 4 character di awal hash
console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

// pembuktian dengan nonce jika proofOfWork berhasil dengan nonce yang dihasilkan
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 31374));
/* --------------------------------------------- */