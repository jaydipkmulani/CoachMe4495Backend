import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  tutorId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  readByTutor: {
    type: Boolean,
    required: true,
  },
  readByStudent: {
    type: Boolean,
    required: true,
  },
  lastMessage: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

export default mongoose.model("Conversation", conversationSchema)