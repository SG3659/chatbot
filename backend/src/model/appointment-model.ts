import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    require: true,
  },
  doctorName: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  treatment: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "completed"],
    default: "scheduled",
  },
  cancelledAt: {
    type: Date,
    default: null,
  }
}, { timestamps: true });
export default mongoose.model("Appointment", appointmentSchema);