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
// const previousBlockHash = 'KSA1231SAQWKDLSSA';
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: 'JHKSKJHS778A',
//         recipient: 'KJHKV786HJKV'
//     },
//     {
//         amount: 30,
//         sender: 'JHKSKJHS778',
//         recipient: 'NCVNCBS918'
//     },
//     {
//         amount: 50,
//         sender: 'ASWWEQEQW33541',
//         recipient: 'MUHYHGTGATA515'
//     },
// ];

// // process untuk match 4 character di awal hash
// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

// // pembuktian dengan nonce jika proofOfWork berhasil dengan nonce yang dihasilkan
// // console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 31374));
/* --------------------------------------------- */



/* --------------------------------------------- */
// Testing for chain is valid
const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1739714584966,
            "transaction": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1739714591537,
            "transaction": [],
            "nonce": 16441,
            "hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1739714623334,
            "transaction": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "f670dd94b2ad45709257b3b31e664aea",
                    "transactionId": "68c158de9e97469a9b8b7cacff26fd99"
                },
                {
                    "amount": 30,
                    "sender": "JIDAN123",
                    "recipient": "FEYFA123",
                    "transactionId": "764062ad511b4079bc9f3a967e986722"
                },
                {
                    "amount": 10,
                    "sender": "JIDAN123",
                    "recipient": "FEYFA123",
                    "transactionId": "d9c2c593b73444f4888c958f7172abef"
                }
            ],
            "nonce": 21672,
            "hash": "0000fdc10f3526538fac195e9a64a1b90c54eb0b760c422954ead5f5d1105d76",
            "previousBlockHash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
        },
        {
            "index": 4,
            "timestamp": 1739714719024,
            "transaction": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "f670dd94b2ad45709257b3b31e664aea",
                    "transactionId": "69899a392ef64e5da73e1a8b16baca86"
                },
                {
                    "amount": 40,
                    "sender": "JIDAN123",
                    "recipient": "FEYFA123",
                    "transactionId": "12edbf39a71b4bb48aa345c8cfa6939a"
                },
                {
                    "amount": 50,
                    "sender": "JIDAN123",
                    "recipient": "FEYFA123",
                    "transactionId": "e044a16caab749ee8c16a6563c0377ac"
                },
                {
                    "amount": 60,
                    "sender": "JIDAN123",
                    "recipient": "FEYFA123",
                    "transactionId": "a84f1816fadc42a3b4cb6f58edb50894"
                },
                {
                    "amount": 70,
                    "sender": "JIDAN123",
                    "recipient": "FEYFA123",
                    "transactionId": "459b7e03b0754f93a9acf6d584e7d25d"
                }
            ],
            "nonce": 87728,
            "hash": "000031df4ab5c21bfdeda9a048b98e9ce9c89d2300b50d89e0347e985f23dccc",
            "previousBlockHash": "0000fdc10f3526538fac195e9a64a1b90c54eb0b760c422954ead5f5d1105d76"
        },
        {
            "index": 5,
            "timestamp": 1739714763038,
            "transaction": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "f670dd94b2ad45709257b3b31e664aea",
                    "transactionId": "da7fe02660d94349981a47157f4afa61"
                }
            ],
            "nonce": 22423,
            "hash": "0000c826ce21de05f074f63ed070cd49bfe4b197c062a3ea7f1cf6d01446193e",
            "previousBlockHash": "000031df4ab5c21bfdeda9a048b98e9ce9c89d2300b50d89e0347e985f23dccc"
        },
        {
            "index": 6,
            "timestamp": 1739714764788,
            "transaction": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "f670dd94b2ad45709257b3b31e664aea",
                    "transactionId": "9b331511eb0147cdb058cc4522ca975f"
                }
            ],
            "nonce": 8364,
            "hash": "0000580c05459bf1cd76be4fdf1fbb001286970f1fcc330ab3c2bc5e4d6d994b",
            "previousBlockHash": "0000c826ce21de05f074f63ed070cd49bfe4b197c062a3ea7f1cf6d01446193e"
        }
    ],
    "pendingTransaction": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "f670dd94b2ad45709257b3b31e664aea",
            "transactionId": "eeb0d73227544d8588d142941936931e"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
}

console.log(`VALID : ${bitcoin.chainIsValid(bc1.chain)}`);
/* --------------------------------------------- */

