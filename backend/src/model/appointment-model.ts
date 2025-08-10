import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    require: true,
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
  }
});
export default mongoose.model("Appointment", appointmentSchema);