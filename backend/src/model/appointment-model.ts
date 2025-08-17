import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  // patientAge: {
  //   type: Number,
  //   require: true,
  // },
  // patientPhone: {
  //   type: String,
  //   require: true,
  // },
  // doctorId: {
  //   type: String,
  //   require: true,
  // },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  }
});
// Prevent double booking: one appointment per doctor per date+time
appointmentSchema.index({ doctorName: 1, date: 1, time: 1 }, { unique: true });
export default mongoose.model("Appointment", appointmentSchema);