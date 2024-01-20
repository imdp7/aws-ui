/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
  text: String,
  virtualization: String,
  enaEnabled: Boolean,
  rootDeviceType: String,
  freeTier: Boolean,
});

// Define a pre-save hook to generate a unique ID based on type
itemsSchema.pre('save', function (next) {
  if (!this.id) {
    // Generate a unique ID based on the first two letters of type followed by a unique ID
    const uniqueId = generateUniqueId(this.parent().os.type);
    this.id = `${this.parent().os.type.substring(0, 2)}-${uniqueId}`;
  }
  next();
});

function generateUniqueId(prefix) {
  // Implement your logic to generate a unique ID
  // You can use libraries like uuid or implement your own logic
  // For simplicity, let's use a timestamp for demonstration purposes
  return `${prefix}-${Date.now()}`;
}

const amiSchema = new mongoose.Schema({
  os: {
    type: {
      type: String,
      enum: [
        'amazon linux',
        'windows',
        'ubuntu',
        'macOS',
        'redHat',
        'SUSE-linux',
        'debain',
        'other',
      ], // Add other types as needed
    },
    items: [itemsSchema],
  },
});

const AMI = mongoose.model('AMI', amiSchema);

module.exports = AMI;
