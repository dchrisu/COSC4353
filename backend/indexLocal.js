const express = require('express');
const cors = require('cors');
var mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
var portX = 5000;

app.use(cors());
app.use(bodyParser.json())



//Listen on port:
app.listen(portX, () => {
    console.log("Listening on port: " + portX)
});

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Group2PO',
    database: 'SoftwareEngiProject2019'
});
connection.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected successfully to MySQL Database");
    }
});

app.post('/post_ClientRegistration', (req, res) => {
    const { param1, param2 } = req.body;
    //console.log(req.body.param1);
    /*var parameters = [
        {name: 'Username', sqltype: mysql.VarChar, value: req.body.param1},
        {name: 'Password', sqltype: mysql.VarChar, value: req.body.param2}
    ]
    */

    connection.query("INSERT INTO LoginCredentials (Username, UserPassword) VALUES ('" + req.body.param1 + "', '" + req.body.param2 + "')"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record inserted");
                //console.log("@Username");
                return res.json({
                    data: results
                })
            }
        })

    //return res.json({ data: results = { key1: "value1", key2: "value2", } })
});

app.post('/get_Login', (req, res) => {
    const { param1 } = req.body;
    console.log(req.body.param1);

    connection.query("SELECT Username, UserPassword FROM LoginCredentials WHERE Username = '" + req.body.param1 + "'"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("Retrieved Username");

                return res.json({
                    data: results
                })
            }
        })

    //return res.json({ data: results = { key1: "value1", key2: "value2", } })
});



app.post('/post_PricingModule', (req, res) => {
    const { param_GallonsRequested, param_Address, param_Date, param_User, param_FuelQuoteHistory_Flag } = req.body;

    //Algorithm
    //Current Price per Gallon *
    var PricePerGallon = 1.50;

    //Location Factor *
    var regex = new RegExp("$TX$")
    var LocationFactor;
    if (regex.test(param_Address)) { LocationFactor = .02; }
    else { LocationFactor = .04; }

    //Rate History Factor *
    var RateHistoryFactor;
    if (param_FuelQuoteHistory_Flag) { RateHistoryFactor = .01; }
    else { RateHistoryFactor = 0; }


    //Gallons Requested Factor *
    var GallonsRequestedFactor;
    if (param_GallonsRequested > 1000) { GallonsRequestedFactor = .02; }
    else { GallonsRequestedFactor = .03; }

    //Company Profit Factor *
    var CompanyProfitFactor = .1;


    //Rate Fluctuation *
    var RateFluctuationFactor;
    if (param_Date) { RateFluctuationFactor = 0.04; }
    else { RateFluctuationFactor = 0.03; }

    //Final Calculation * 
    var SuggestedRatePerGallon = PricePerGallon + (LocationFactor - RateHistoryFactor + GallonsRequestedFactor + CompanyProfitFactor + RateFluctuationFactor) * PricePerGallon;

    return res.json({ data: results = { SuggestedPrice: SuggestedRatePerGallon } })
});

app.post('/getClientAddressAndHistoryFlag', (req, res) => {
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

