const express = require('express');
//const cors = require('cors');
const app = express();
//const bodyParser = require('body-parser')
var portX = 3000;

//app.use(cors());
//app.use(bodyParser.json())
/*
app.use('/', (req, res) => {
    res.status(200).send('Hello World!');
})
*/
//Listen on port:
app.listen(portX, () => {
    console.log("Listening on port: " + portX)
});

/*
const connection = mysql.createConnection({
    host: 'rds-mysql-4353project.c4g1feomwyfl.us-east-1.rds.amazonaws.com',
    port: '',
    user: 'masterUsername',
    password: 'deMesa889',
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
    return res.json({ data: results = { key1: "value1", key2: "value2", key3: "", } })
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
            { GallonsRequested: 5, Date: '2/14/2019', Price: '$432.23', Total: '$1000.66' },
            { GallonsRequested: 4, Date: '3/7/2019', Price: '$15.23', Total: '$190.32' },
            { GallonsRequested: 23, Date: '3/30/2019', Price: '$23.23', Total: '$300.00' },
            { GallonsRequested: 1, Date: '4/15/2019', Price: '$843.23', Total: '$2054.11' },
            { GallonsRequested: 3, Date: '7/2/2019', Price: '$10.23', Total: '$145.00' }
        ]
    })
});

