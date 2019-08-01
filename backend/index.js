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

//Checks to see if username to be created already exists or not within the database
app.post('/post_CheckRegistrationInfo', (req, res) =>{
    const {param1} = req.body;

    connection.query("SELECT IF(EXISTS(SELECT * from LoginCredentials WHERE Username = '"+req.body.param1+"'),1,0)"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("Checked if record exists.");
                return res.json({
                    data: results
                })
            }
        })
    

})

//Creates a new row in database for new account registration
//Creates an empty field in ClientInfo table and grabs its key to use as reference in the LoginCredentialsTable
app.post('/post_ClientRegistrationPt1', (req, res) => {

    connection.query("INSERT INTO ClientInfo (FirstName) VALUES (NULL)"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record inserted into ClientInfo table");
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

//Inserts new account information into database with proper referenced foreign key
app.post('/post_ClientRegistrationPt2', (req, res) => {
    const { param1, param2, param3 } = req.body;

    connection.query("INSERT INTO LoginCredentials (Username, UserPassword, ClientInfoFK) VALUES ('" + req.body.param1 + "', '" + req.body.param2 + "', '" + req.body.param3 + "')"
        , function (err, results) {
            if (err) {
                console.log("There is an error!");
                console.log(err);
            }
            else {
                console.log("1 record also inserted into LoginCredentials table");
                return res.json({
                    data: results
                })
            }
        })

    //return res.json({ data: results = { key1: "value1", key2: "value2", } })
});

//Retrieves login info from LoginCredentials table and will later check to see if user inputted field forms match
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

//On profile information/management screen, this will update user inputted field forms into 
//the ClientInfo table
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

//This will be called in the ComponentDidMount() function in order to retrieve
//user profile information from database and show properly for user
app.post('/get_ClientProfileManagement', (req, res) => {
    const { param1 } = req.body;

    connection.query("SELECT ClientPK, FirstName, LastName, Address1, Address2, City, Zipcode, FuelQuoteHistory_Flag, State FROM ClientInfo WHERE ClientPK = '" + req.body.param1 + "'"
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
    var regex = new RegExp("TX")
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
    connection.query(
        `UPDATE SoftwareEngiProject2019.ClientInfo SET FuelQuoteHistory_Flag = 1 WHERE ClientPK = '${param_User}'`
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