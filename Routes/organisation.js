const express = require('express');
const Organization = require('../DB/model/organisation');
const router = express.Router();

// Endpoint to register a new company
router.post('/registerCompany', async (req, res) => {
    const {
        companyName,
        branchLocation,
        coordinates,
        officeStartTime,
        officeEndTime,
        floorCoordinates,
        contactEmail,
        contactPhone
    } = req.body;

    try {
        // Check if a company with the same name and location already exists
        const existingCompany = await Organization.findOne({ companyName, branchLocation });
        if (existingCompany) {
            return res.status(400).json({ message: "Company with the same name and location already exists" });
        }

        // Create a new company
        const newCompany = new Organization({
            companyName,
            branchLocation,
            coordinates,
            officeStartTime,
            officeEndTime,
            floorCoordinates,
            contactEmail,
            contactPhone,
        });

        await newCompany.save();

        res.status(201).json({ message: "Company registered successfully", company: newCompany });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
