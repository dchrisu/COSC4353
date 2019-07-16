const app = require('express')();

app.use('/', (req, res) => {
  res.status(200).send('Hello World!');
  console.log(req.body)  
});

app.listen(5000);