import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  starNumber: {
    type: Number,
    default: 0,
  },
  courseCategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  shortTitle: {
    type: String,
    
  },
  shortDesc: {
    type: String,
    
  },
  duration: {
    type: Number,
    required: true,
  },
  numberOfClass: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

export default mongoose.model("Course", courseSchema)