import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgFileName: {
    type: String,
  },
  dateUploaded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  itemType: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  brand: {
    type: String,
  },
  schoolFoundIn: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
  },
  claimedBy: {
    type: String,
  },
  adminApproved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('LostItem', lostItemSchema);
