import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required']
    },
    accountId: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        default: null,
    },
    dob: {
        type: String,
        default: null
    },
    nationality: {
        type: String,
    },
    residentialAddress: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    postalCode: {
        type: String,
        default: null
    },
    countryCode: {
        type: String,
        default: null
    },
    referralCode: {
        type: String,
        trim: true,
        default: null
    },
    refererID: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    balance: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    displayBalance: {
        type: Boolean,
        default: false,
    },
    accountType: {
        type: String,
        enum: ['Basic', 'Premium'],
        default: 'Basic'
    },
    kycStatus: {
        type: String,
        enum: ['verified', 'pending', 'unverified'],
        default: 'unverified'
    },
    totalInvestment: {
        type: Number,
        default: 0
    },
    totalDeposit: {
        type: Number,
        default: 0
    },
    totalReturns: {
        type: Number,
        default: 0
    },
    cardNumber: {
        type: String,
    },
    cvcNumber: {
        type: Number
    },
    cardType: {
        type: String,
        enum: ['VISA', 'MASTERCARD'],
        default: 'VISA'
    },
    googleId: {
        type: String,
    },
    expiryDate: {
        type: String,
    },
    email_verification: {
        type: Number,
        default: 0,
    },
    Currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'JPY'],
        default: 'USD',
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
export default User;    