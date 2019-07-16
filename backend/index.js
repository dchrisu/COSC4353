const app = require('express')();
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

/*
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Group2PO',
    database: 'postoffice'
})*/

connection.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected successfully to MySQL Database");
    }
});

/*
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '@gmail.com',
        pass: ''
    }
});*/

app.use(cors());
app.use(bodyParser.json())
app.use('/', (req, res) => {
<<<<<<< HEAD
    res.status(200).send('Hello World!');
=======
  res.status(200).send('Hello World!');
  console.log(req.body)  
>>>>>>> bbe97764232798d146a307249a8b48be15e5bdd8
});

app.post('/get_shipstatus', (req, res) => {
    const { package_id } = req.body;
    /*
    connection.query(``
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

    // key = columnName
    // value = entry
    // Name: "chris", LastName: "dang", 
    return res.json({ data: results = { key1: "value1", key2: "value", key3: "", } })
});


//Listen on port:
var portX = 5000;
app.listen(portX, () => {
    console.log("Listening on port: " + portX)
});
