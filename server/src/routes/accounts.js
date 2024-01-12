/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const router = express.Router();
const Account = require('../schema/accountsSchema');

// Route for handling GET requests to retrieve all accounts
router.get('/', async (req, res) => {
  try {
    // Retrieve all accounts from the database
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error retrieving accounts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling POST requests to create a new account
router.post('/', async (req, res) => {
  const { email } = req.body.user;

  try {
    // Check if the email is already associated with an existing account
    const existingAccount = await Account.findOne({ 'user.email': email });

    if (existingAccount) {
      return res.status(400).json({
        error: 'Email is already associated with an existing account',
      });
    }

    // Create a new account
    const newAccount = new Account(req.body);

    // Save the new account
    const savedAccount = await newAccount.save();

    res.status(201).json(savedAccount);
    console.log('Account created successfully:', savedAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Find the account by user.sub
    const account = await Account.findOne({ 'user.sub': sub });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Update preferences
    account.preferences = req.body.preferences;

    // Save the updated account
    const updatedAccount = await account.save();

    res.status(200).json(updatedAccount);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling GET requests to retrieve an account by sub
router.get('/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Retrieve the account by sub
    const account = await Account.findOne({ 'user.sub': sub });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Error retrieving account:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling DELETE requests to delete an account by sub
router.delete('/:sub', async (req, res) => {
  const sub = req.params.sub;

  try {
    // Find and delete the account by user.sub
    const result = await Account.deleteOne({ 'user.sub': sub });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json(`Account with ID ${sub} deleted successfully`);
    console.error('Succesully deleted account:', sub);
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
