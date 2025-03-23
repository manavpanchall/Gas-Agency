const express = require('express');
const router = express.Router();
const Cylinder = require('../models/cylinder');

// Get all cylinders
router.get('/getallcylinders', async (req, res) => {
    try {
        const cylinders = await Cylinder.find({});
        if (!cylinders || cylinders.length === 0) {
            return res.status(404).json({ message: 'No cylinders found', cylinders: [] }); // Return an empty array
        }

        // Add quantity field dynamically
        const modifiedCylinders = cylinders.map(cylinder => ({
            ...cylinder._doc,
            quantity: cylinder.totalcylinder // Map `totalcylinder` as `quantity`
        }));

        res.json(modifiedCylinders); // Return the array of cylinders
    } catch (error) {
        console.error('Error fetching cylinders:', error);
        res.status(500).json({
            message: 'Failed to fetch cylinders',
            error: error.message,
            cylinders: [] // Return an empty array in case of error
        });
    }
});

router.post('/getcylinderbyid', async (req, res) => {
    const { cylinderid } = req.body;
    console.time('getcylinderbyid'); // Start timer
    try {
        const cylinder = await Cylinder.findById(cylinderid);
        console.timeEnd('getcylinderbyid'); // End timer
        if (!cylinder) {
            return res.status(404).json({ message: 'Cylinder not found' });
        }
        res.send(cylinder);
    } catch (error) {
        console.timeEnd('getcylinderbyid'); // End timer
        console.error('Error fetching cylinder:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add a new cylinder
router.post('/addcylinder', async (req, res) => {
    const { name, price, weight, bodyweight, description, type, phone, imageurls } = req.body;

    // Server-side validation
    if (!name || !type || !price || !weight || !bodyweight || !phone || !description || !imageurls) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newCylinder = new Cylinder({
            name,
            price,
            weight,
            bodyweight,
            description,
            type,
            phone,
            imageurls,
        });

        await newCylinder.save();
        res.send('New cylinder added successfully');
    } catch (error) {
        console.error('Error adding cylinder:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;