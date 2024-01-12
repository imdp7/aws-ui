/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const Region = require('../schema/regionsSchema');

// Route for handling GET requests to retrieve all accounts
router.get('/', async (req, res) => {
  try {
    // Retrieve all accounts from the database
    const regions = await Region.find();
    res.status(200).json(regions);
  } catch (error) {
    console.error('Error retrieving regions:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { regions } = req.body;

    // Assuming you want to add an entire array of regions
    const newRegions = await Region.create({ regions });

    res.status(201).json(newRegions);
    console.log('Regions created successfully:', newRegions);
  } catch (error) {
    console.error('Error creating regions:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
