import Blockchain from "./blockchain.mjs";

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'HKJVSBWWAKJ', 'KJSBNJSW876');
bitcoin.createNewBlock(111, 'KJBKJBKJBBKJ', 'UIYUIYIUY');
bitcoin.createNewBlock(3245, 'QWECFD^6465', 'UHGUIJH65');

console.log(bitcoin);