/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    sub: { type: String },
    email: { type: String },
    email_verified: { type: Boolean },
  },
  preferences: {
    mode: { type: String, default: 'Light' },
    density: { type: String, default: 'Comfortable' },
    motion: { type: Boolean, default: false },
  },
  region: { type: String },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
