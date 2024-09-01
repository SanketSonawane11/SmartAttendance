const mongoose = require('mongoose');

const calculateWorkingHours = (checkInTime, checkOutTime) => {
    if (!checkInTime || !checkOutTime) return 0;

    const checkIn = new Date(checkInTime);
    const checkOut = new Date(checkOutTime);
    const diffInMs = checkOut - checkIn;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours;
};

const attendanceSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    checkInTime: {
        type: Date,
        required: true,
    },
    checkOutTime: {
        type: Date,
    },
    workingHours: {
        type: Number,
        min: 0,
        max: 24,
    },
    count: {
        type: Number,
        default: 0
    }
});


attendanceSchema.pre('save', function (next) {
    if (this.checkInTime && this.checkOutTime) {
        this.workingHours = calculateWorkingHours(this.checkInTime, this.checkOutTime);
    }
    next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
