/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const EC2_Instances = require('../../../schema/services/ec2/ec2_instancesSchema');

// Route for handling GET requests to retrieve profiles
router.get('/instances', async (req, res) => {
  try {
    // Retrieve all profile from the database
    const instances = await EC2_Instances.find();
    res.status(200).json(instances);
  } catch (error) {
    console.error('Error retrieving instances:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling POST requests to create a new profile
router.post('/instances', async (req, res) => {
  const { sub } = req.body;

  try {
    // Check if the instance is already associated with an existing profile
    const existingInstance = await EC2_Instances.findOne({ sub });

    if (existingInstance) {
      return res.status(400).json({
        error: 'instance is already associated with an existing instance',
      });
    }

    // Create a new profile
    const newInstances = new EC2_Instances(req.body);

    // Save the new profile
    const savedInstances = await newInstances.save();

    res.status(201).json(savedInstances);
    console.log('EC2 Instance created successfully:', savedInstances);
  } catch (error) {
    console.error('Error creating EC2 Instance:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/instances/:sub', async (req, res) => {
  const sub = req.params.sub;
  try {
    // Find the profile by user.sub
    let instance = await EC2_Instances.findOne({ sub });

    if (!instance) {
      return res.status(404).json({ error: 'EC2 Instance not found' });
    }

    // Update preferences
    instance = Object.assign(instance, req.body);
    console.log('EC2 Instance :', instance);
    // Save the updated profile
    const updatedInstance = await instance.save();

    res.status(200).json(updatedInstance);
  } catch (error) {
    console.error('Error updating EC2 Instance:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling GET requests to retrieve an profile by sub
router.get('/instances/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Retrieve the profile by sub
    const instance = await EC2_Instances.findOne({ sub });

    if (!instance) {
      return res.status(404).json({ error: 'EC2 Instance not found' });
    }

    res.status(200).json(instance);
  } catch (error) {
    console.error('Error retrieving EC2 Instance:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling DELETE requests to delete an profile by sub
router.delete('/instances/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Find and delete the profile by user.sub
    const result = await EC2_Instances.deleteOne({ sub });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'EC2 Instance not found' });
    }

    res.status(200).json(`EC2 Instance with ID ${sub} deleted successfully`);
    console.error('Succesully deleted EC2 Instance:', sub);
  } catch (error) {
    console.error('Error deleting EC2 Instance:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
