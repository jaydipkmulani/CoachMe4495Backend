import Appointment from '../models/appointment.model.js';
import createError from "../utils/createError.js";
// Create appointment
export const createAppointment = async (req, res) => {
    if (!req.isTutor) return next(createError(403, "Only tutor can create course "));

    try {
      
        const  tutorId=req.body.currentUserId;
        const {  date, time } = req.body;
        const appointment = new Appointment({
            tutorId,
            date,
            time,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).send('Failed to create appointment' );
    }
};

// Update appointment
// Update appointment
export const updateAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body; // Object containing the fields to be updated
  
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        updates, // Use the updates object to update the fields
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).send('Appointment not found');
      }
  
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).send('Failed to update appointment');
    }
  };

// Delete appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).send('Appointment not found' );
        }

        res.json(deletedAppointment);
    } catch (error) {
        res.status(500).send('Failed to delete appointment');
    }
};

// Find one appointment
export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get appointment' });
    }
};
export const getAppointmentsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      
      const appointments = await Appointment.find({
        $or: [{ tutorId: userId }, { studentId: userId }],
      });
  
      if (appointments.length === 0) {
        return res.status(404).json({ error: 'No appointments found for the user' });
      }
  
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get appointments' });
    }
  };
  