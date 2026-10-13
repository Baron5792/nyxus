import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A wallet name is required'],
    },
    address: {
        type: String,
        required: [true, 'An address is required']
    },
    min: {
        type: Number,
        default: 0,
    }
}, {timestamps: true});

const Wallet = mongoose.model(WalletSchema);
export default Wallet;