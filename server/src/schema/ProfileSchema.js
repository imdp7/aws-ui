/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  full_name: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postal_code: { type: String },
  country: { type: String },
  phone: { type: String },
  company_name: { type: String },
  website_url: { type: String },
});

const profileSchema = new mongoose.Schema({
  sub: { type: String },
  account: {
    email: { type: String },
    hash: { type: String },
  },
  contact_information: contactSchema,
  payment_currency: { type: String },
  status: { type: String },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
