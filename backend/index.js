const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
var portX = 5000;

app.use(cors());
app.use(bodyParser.json())
/*
app.use('/', (req, res) => {
    res.status(200).send('Hello World!');
})
*/
//Listen on port:
app.listen(portX, () => {
    console.log("Listening on port: " + portX)
});



var mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'rds-mysql-4353project.c4g1feomwyfl.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'masterUsername',
    password: 'deMesa889',
    database: 'SoftwareEngiProject2019'
})



connection.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected successfully to MySQL Database");
    }
});


app.post('/post_ClientRegistrationPt1', (req, res) => {
    //const { param1, param2 } = req.body;

    connection.query("INSERT INTO ClientInfo (FirstName) VALUES (NULL)"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record inserted into ClientInfo table");
                //return res.json({
                //    data: results
                //})
            }
        })

    connection.query("SELECT ClientPK FROM  ClientInfo ORDER BY ClientPK DESC LIMIT 1"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record selected from ClientInfo table");
                return res.json({
                    data: results
                })
            }
        })

    //return res.json({ data: results = { key1: "value1", key2: "value2", } })
});


app.post('/post_ClientRegistrationPt2', (req, res) => {
    const { param1, param2, param3 } = req.body;
    //console.log(req.body.param1);
    /*var parameters = [
        {name: 'Username', sqltype: mysql.VarChar, value: req.body.param1},
        {name: 'Password', sqltype: mysql.VarChar, value: req.body.param2}
    ]
    */

    connection.query("INSERT INTO LoginCredentials (Username, UserPassword, ClientInfoFK) VALUES ('" + req.body.param1 + "', '" + req.body.param2 + "', '" + req.body.param3 + "')"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record also inserted into LoginCredentials table");
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

    connection.query("SELECT Username, UserPassword, ClientInfoFK FROM LoginCredentials WHERE Username = '" + req.body.param1 + "'"
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

app.post('/post_ClientProfileManagementFirstLogin', (req, res) => {
    const { param1, param2, param3, param4, param5, param6, param7, param8 } = req.body;

    connection.query("UPDATE ClientInfo SET FirstName = '" + req.body.param1 + "', LastName = '" + req.body.param2 + "', Address1 = '" + req.body.param3 + "', Address2 = '" + req.body.param4 + "', City = '" + req.body.param5 + "', State = '" + req.body.param6 + "', Zipcode = '" + req.body.param7 + "' WHERE ClientPK = '" + req.body.param8 + "'"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record inserted into ClientInfo table");
                return res.json({
                    data: results
                })
            }
        })

    //return res.json({ data: results = { key1: "value1", key2: "value2", } })
});

app.post('/get_ClientProfileManagement', (req, res) => {
    const { param1 } = req.body;

    connection.query("SELECT ClientPK, FirstName, LastName, Address1, Address2, City, Zipcode, FuelQuoteHistoryFK, State FROM ClientInfo WHERE ClientPK = '" + req.body.param1 + "'"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("Retrieved User Profile Information");

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