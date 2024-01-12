/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');

var mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');

var app = express();

//environment variables

require('dotenv').config();

const indexRoutes = require('./routes/index');
const accountRoutes = require('./routes/accounts');
const regionRoutes = require('./routes/regions');
const profileRoutes = require('./routes/profile');
const instancesRoutes = require('./routes/services/ec2/ec2_instances');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', indexRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/profile', profileRoutes);
// app.use('/api/services/ec2', instancesRoutes);

//connect to db on mongodb atlas
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    //listen for requests
    console.log('connected to database');
    app.listen(process.env.PORT || 3000, () => {
      console.log('listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
