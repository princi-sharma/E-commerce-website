const express = require('express');
const ContactModel = require('../models/contact');
const router = express.Router();

// Route for submitting contact form
router.post('/submit', async(req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new ContactModel({
            name,
            email,
            message,
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact submitted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;