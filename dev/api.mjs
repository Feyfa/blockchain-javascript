import express from "express";
import bodyParser from "body-parser";

const app = express();

/* MIDDLEWARE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* MIDDLEWARE */



/* ROUTE */
app.get('/blockchain', function(req, res) {
    
});

app.post('/transaction', function (req, res) {
    console.log(req.body);
    res.send(`The Amount Of The Transaction is ${req.body.amount} Bitcoin`);
});

app.get('/mine', function(req, res) {
    
});
/* ROUTE */



/* LISTEN */
app.listen(3000, function() {
    console.log(`Running in port ${30000}`);
});
/* LISTEN */