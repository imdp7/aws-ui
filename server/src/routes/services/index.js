/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors'); // Import the cors middleware

var app = express();
app.use(cors());
app.use(express.json());
