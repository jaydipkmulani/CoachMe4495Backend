import express from 'express';
import { verifyToken } from "../middleware/jwt.js";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentsByUserId,

} from '../controllers/appointment.controller.js';

const router = express.Router();

// Create appointment
router.post('/', verifyToken,createAppointment);

// Update appointment
router.put('/:id',verifyToken, updateAppointment);

// Delete appointment
router.delete('/:id', verifyToken,deleteAppointment);

// Find one appointment
router.get('/:id',verifyToken, getAppointmentById);

// Get appointments by  ID
router.get('/user/:userId', getAppointmentsByUserId);

export default router;
