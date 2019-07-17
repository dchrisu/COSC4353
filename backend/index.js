const express = require('express');
//const cors = require('cors');
const app = express();
//const bodyParser = require('body-parser')
var portX = 5000;

//app.use(cors());
//app.use(bodyParser.json())
app.use('/', (req, res) => {
    res.status(200).send('Hello World!');
})

//Listen on port:
app.listen(portX, () => {
    console.log("Listening on port: " + portX)
});

/*
const connection = mysql.createConnection({
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
})*/
/*
connection.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected successfully to MySQL Database");
    }
});*/

/*
var transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        pass: ''
    }
});*/


app.post('/post_FuelQuote', (req, res) => {
    const { pass_in_parameter1, pass_in_parameter2 } = req.body;
    /*
    connection.query(`INSERT INTO table.FuelQuoteHistory ()`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
    */
    return res.json({ data: results = { key1: "value1", key2: "value", key3: "", } })
});


app.post('/get_FuelQuoteHistory', (req, res) => {
    const { pass_in_parameter1 } = req.body;
    /*
    connection.query(`SELECT * from table.FuelQuoteHistory`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                return res.json({
                    data: results
                })
            }
        })
    */
    return res.json({
        data: results = [
            { Gallons: 5, Address: '3000 House Street', Date: '2/14/2019', Price: '$432.23', Total: '$1000.66' },
            { Gallons: 4, Address: '12 Tet Canal', Date: '3/7/2019', Price: '$15.23', Total: '$190.32' },
            { Gallons: 23, Address: '3399 Street Place', Date: '3/30/2019', Price: '$23.23', Total: '$300.00' },
            { Gallons: 1, Address: '987 Nice Place', Date: '4/15/2019', Price: '$843.23', Total: '$2054.11' },
            { Gallons: 3, Address: '4265 Area Farm', Date: '7/2/2019', Price: '$10.23', Total: '$145.00' }
        ]
    })
});

