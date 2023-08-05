import mongoose from 'mongoose';

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  tutorId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
   
  },
  courseId: {
    type: String,
    
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  bookedBy: {
    type: String,
  },
  isBooked: {
    type: Boolean,
    default: false, // Set the default value to false
  },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
