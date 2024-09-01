const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const z = require('zod');
const userValidation = require('../Middleware/userValidation');
const User = require('../DB/model/user');
const Attendance = require('../DB/model/attendance');
const Organization = require('../DB/model/organisation');
require("dotenv").config();

const secret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, phone, password, department, gender, branch, idNumber, workingFloor, faceData, companyId } = req.body;

    try {
        // Check if the company exists
        const company = await Organization.findById(companyId);
        if (!company) {
            return res.status(400).json({ message: "Company not found" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "User Already Exists" });

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            department,
            gender,
            branch,
            idNumber,
            workingFloor,
            faceData,
            company: companyId,
        });

        await newUser.save();

        const token = jwt.sign({ email }, secret);
        res.status(201).json({ message: "User registered successfully", token, user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const userPassword = User.password;
        if (!password === userPassword) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign({ email: user.email }, secret);

        res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/updateAttendance', async (req, res) => {
    const { email, date, checkInTime, checkOutTime } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Find existing attendance record for the date
        let attendance = await Attendance.findOne({ employee: user._id, date: new Date(date) });

        if (attendance) {
            // If check-in time is provided and it's earlier than the existing check-in time, update it
            if (checkInTime && (!attendance.checkInTime || new Date(checkInTime) < attendance.checkInTime)) {
                attendance.checkInTime = new Date(checkInTime);
            }

            // If check-out time is provided and it's later than the existing check-out time, update it
            if (checkOutTime && (!attendance.checkOutTime || new Date(checkOutTime) > attendance.checkOutTime)) {
                attendance.checkOutTime = new Date(checkOutTime);
            }

            await attendance.save();
        } else {
            // If no existing record, create a new attendance entry
            attendance = new Attendance({
                employee: user._id,
                organization: user.organization,
                date: new Date(date),
                checkInTime: checkInTime ? new Date(checkInTime) : undefined,
                checkOutTime: checkOutTime ? new Date(checkOutTime) : undefined,
            });
            await attendance.save();

            // Push the new attendance record to the user's attendanceRecords array
            user.attendanceRecords.push(attendance._id);
            await user.save();
        }

        res.status(200).json({ message: "Attendance updated successfully", attendance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;