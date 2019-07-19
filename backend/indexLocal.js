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


//Chris' REST calls
app.post('/post_PricingModule', (req, res) => {
    const { param_GallonsRequested, param_Address, param_Date, param_FuelQuoteHistory_Flag } = req.body;

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
    var regexDates = new RegExp("0[6-8]")
    if (regexDates.test(param_Date.substring(5, 7))) { RateFluctuationFactor = 0.04; }
    else { RateFluctuationFactor = 0.03; }

    //Final Calculation * 
    var SuggestedRatePerGallon = PricePerGallon + (LocationFactor - RateHistoryFactor + GallonsRequestedFactor + CompanyProfitFactor + RateFluctuationFactor) * PricePerGallon;

    console.log("Pricing Module: " + SuggestedRatePerGallon);
    console.log("   Algorithm displayed: " + PricePerGallon + " + " + "(" + LocationFactor + " - " + RateHistoryFactor + " + " + GallonsRequestedFactor + " + " + CompanyProfitFactor + " + " + RateFluctuationFactor + ") * " + PricePerGallon)
    return res.json({ SuggestedPrice: SuggestedRatePerGallon });
});

app.post('/get_ClientAddressAndHistoryFlag', (req, res) => {
    const { param_cur_User } = req.body;

    connection.query(`SELECT Address1, City, Zipcode, State, FuelQuoteHistory_Flag FROM SoftwareEngiProject2019.ClientInfo where ClientPK = '${param_cur_User}'`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Client Address and History Flag: Successful!");
                return res.json({
                    data: results
                })
            }
        })
});

app.post('/post_FuelQuote', (req, res) => {
    const { param_GallonsRequested, param_DeliveryDate, param_SuggestedPrice, param_TotalAmountDue, param_User } = req.body;

    connection.query(
        `INSERT INTO SoftwareEngiProject2019.FuelQuoteHistory (GallonsRequested, DeliveryDate, SuggestedPrice, TotalAmountDue, ClientInfoFK)
        VALUES ('${param_GallonsRequested}', '${param_DeliveryDate}', '${param_SuggestedPrice}', '${param_TotalAmountDue}', '${param_User}')`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Fuel Quote Post: Successful!")
                return res;
            }
        })
});


app.post('/get_FuelQuoteHistory', (req, res) => {
    const { param_cur_User } = req.body;

    connection.query(`SELECT * from SoftwareEngiProject2019.FuelQuoteHistory where ClientInfoFK = '${param_cur_User}'`
        , function (err, results) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Fuel Quote History: Succesful!")
                return res.json({
                    data: results
                })
            }
        })
});

