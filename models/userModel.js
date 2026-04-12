const mongoose = require('mongoose');
const { getNextId } = require('./counterModel');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { 
        type: String, 
        unique: true, 
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email']
    },
    password: { type: String, required: true, select: false },
    phoneNumber: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\+?[0-9]{10,15}$/, 'Please provide a valid phone number']
    },
    age: { 
        type: Number, 
        required: true,
        min: [18, 'Age must be at least 18'],
        max: [60, 'Age must not exceed 60']
    },
    role: { type: String, enum: ['DRIVER', 'SENDER', 'ADMIN', 'COORDINATOR'], default: 'DRIVER' },
    facilityId: { type: Number },
    enabled: { type: Boolean, default: true }
}, { timestamps: true });

UserSchema.pre('save', async function () {
    if (this.isNew && !this.id) {
        this.id = await getNextId('user');
    }
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

UserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
