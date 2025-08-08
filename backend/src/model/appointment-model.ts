import  mongoose  from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String },
  patientAge: { type: Number },
  patientPhone: { type: String },
  doctorId: { type: String },
  doctorName: { type: String },
  date: { type: String },
  time: { type: String },
  treatment: { type: String }
});
export default  mongoose.model("Appointment", appointmentSchema);