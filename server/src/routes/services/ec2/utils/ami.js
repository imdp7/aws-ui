/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const AMI = require('../../../../schema/services/ec2/utils/amiSchema');

// Route for handling GET requests to retrieve all accounts
router.get('/', async (req, res) => {
  try {
    // Retrieve all accounts from the database
    const ami = await AMI.find();
    res.status(200).json(ami);
  } catch (error) {
    console.error('Error retrieving ami:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { type, ami } = req.body;

    // Find the AMI document with the specified type
    let existingAMI = await AMI.findOne({ 'os.type': type });

    // If the AMI document with the specified type doesn't exist, create a new one
    if (!existingAMI) {
      existingAMI = await AMI.create({ os: { type, items: [] } });
    }

    // Add the new items to the array of the specified type
    existingAMI.os.items.push(...ami);

    // Save the updated AMI document
    const updatedAMI = await existingAMI.save();

    res.status(201).json(updatedAMI);
    console.log('AMI updated successfully:', updatedAMI);
  } catch (error) {
    console.error('Error updating AMI:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
