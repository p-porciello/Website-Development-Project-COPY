import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageFile: {
    type: Buffer,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
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
});

lostItemSchema.virtual('imageFilePath').get(function () {
  if (this.imageFile != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.imageFile.toString('base64')}`;
  }
});

export default mongoose.model('LostItem', lostItemSchema);
