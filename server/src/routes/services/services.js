/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const Services = require('../../schema/services/servicesSchema');

// Route for handling GET requests to retrieve all accounts
router.get('/', async (req, res) => {
  try {
    // Retrieve all accounts from the database
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error retrieving Services:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { services } = req.body;

    // Check if services is an array
    if (!Array.isArray(services)) {
      // If it's an array, create a new document
      const newServices = await Services.create({ services });
      res.status(201).json(newServices);
      console.log('Services created successfully:', newServices);
    } else {
      // If it's not an array, update an existing document
      const existingServices = await Services.findOne();

      if (!existingServices) {
        // Handle the case where the document is not found
        res.status(404).json({ error: 'Document not found' });
        return;
      }

      // Add the new service to the existing array
      existingServices.services.push(...services);

      // Save the updated document
      const updatedServices = await existingServices.save();

      res.status(201).json(updatedServices);
      console.log('Service added successfully to the array:', updatedServices);
    }
  } catch (error) {
    console.error('Error creating/updating Services:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
