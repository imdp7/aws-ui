/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  services: [
    {
      title: String,
      img: String,
      link: String,
      description: String,
      docs: String,
    },
  ],
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
