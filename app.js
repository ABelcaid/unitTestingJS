const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

require('dotenv').config()




app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





mongoose.connect(process.env.DB_CONNECTION , {
  useNewUrlParser: true,
  useUnifiedTopology: true
  
}).then(() => {
 console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});





const ownerRoute = require('./routes/owner');
const agenceRoute = require('./routes/agence');
const compteRoute = require('./routes/compte');
const creditCardRoute = require('./routes/creditCard');
const gabOperationRoute = require('./routes/gabOperation');
const monneyProviderRoute = require('./routes/monneyProvider');
const uploadSumRoute = require('./routes/uploadSum');

app.use('/owner' ,ownerRoute);
app.use('/agence' ,agenceRoute);
app.use('/creditCard' ,creditCardRoute);
app.use('/gabOperation' ,gabOperationRoute);
app.use('/compte' ,compteRoute);
app.use('/monneyProvider' ,monneyProviderRoute);
app.use('/uploadSun' ,uploadSumRoute);




app.get('/', (req, res) => {
  res.send('Hello World!')
})
























app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})