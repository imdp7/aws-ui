/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const Profile = require('../schema/ProfileSchema');

// Route for handling GET requests to retrieve profiles
router.get('/', async (req, res) => {
  try {
    // Retrieve all profile from the database
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling POST requests to create a new profile
router.post('/', async (req, res) => {
  const { sub } = req.body;

  try {
    // Check if the email is already associated with an existing profile
    const existingProfile = await Profile.findOne({ sub });

    if (existingProfile) {
      return res.status(400).json({
        error: 'Email is already associated with an existing profile',
      });
    }

    // Create a new profile
    const newProfile = new Profile(req.body);

    // Save the new profile
    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
    console.log('Profile created successfully:', savedProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:sub', async (req, res) => {
  const sub = req.params.sub;
  try {
    // Find the profile by user.sub
    let profile = await Profile.findOne({ sub });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update preferences
    profile = Object.assign(profile, req.body);
    console.log('Profile :', profile);
    // Save the updated profile
    const updatedProfile = await profile.save();

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling GET requests to retrieve an profile by sub
router.get('/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Retrieve the profile by sub
    const profile = await Profile.findOne({ sub });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling DELETE requests to delete an profile by sub
router.delete('/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Find and delete the profile by user.sub
    const result = await Profile.deleteOne({ sub });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(`Profile with ID ${sub} deleted successfully`);
    console.error('Succesully deleted profile:', sub);
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
