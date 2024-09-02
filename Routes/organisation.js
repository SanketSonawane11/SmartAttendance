const express = require('express');
const Organization = require('../DB/model/organisation');
const User = require('../DB/model/user');
const Attendance = require('../DB/model/attendance');
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

router.get('/attendanceHistory/:organizationId/:month', async (req, res) => {
    const { organizationId, month } = req.params;
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Last day of the month

    try {
        const attendanceHistory = await Attendance.find({
            organization: organizationId,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate('users', 'firstName lastName email');

        res.status(200).json({ attendanceHistory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/todaysAttendance/:organizationId', async (req, res) => {
    const { organizationId } = req.params;
    const today = new Date().setHours(0, 0, 0, 0);

    try {
        const todaysAttendance = await Attendance.countDocuments({
            organization: organizationId,
            date: today,
        });

        res.status(200).json({ todaysAttendance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
