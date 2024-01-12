/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const regionSchema = new mongoose.Schema({
  regions: [
    {
      id: String,
      text: String,
      title: String,
      ariaLabel: String,
      items: [itemSchema],
    },
  ],
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;
