
import Appointment  from "../model/appointment-model.js"


const doctors = {
  andre: {
    id: "andre",
    name: "Andre P. Marshall, M.D., MPH, F.A.C.S.",
    specialties: ["Rhinoplasty", "Facelift", "Lip Fillers"],
    bio: "Dr. Andre P. Marshall is a board-certified plastic surgeon...",
  },
  catherine: {
    id: "catherine",
    name: "Catherine Loflin, MD, FACS",
    specialties: ["Upper Arm Lift", "Tummy Tuck", "Facelift"],
    bio: "Dr. Catherine Loflin is a board-certified plastic surgeon...",
  },
};
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 17) slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

// const tools = [
//   checkAvailability: async ({ doctorId, date }: { doctorId: string; date: string }) => {
//     const doctor = doctors[doctorId as keyof typeof doctors];
//     const availableSlots = await getAvailableSlots(doctorId, date);
//     return {
//       doctor: doctor.name,
//       date,
//       availableSlots,
//       message:
//         availableSlots.length > 0
//           ? `Available slots for ${doctor.name} on ${date}: ${availableSlots.join(", ")}`
//           : `No available slots for ${doctor.name} on ${date}`,
//     };
//   },

//   bookAppointment: async ({
//     patientName,
//     patientAge,
//     patientPhone,
//     doctorId,
//     date,
//     time,
//     treatment,
//   }: {
//     patientName: string;
//     patientAge: number;
//     patientPhone: string;
//     doctorId: string;
//     date: string;
//     time: string;
//     treatment: string;
//   }) => {
//     const doctor = doctors[doctorId as keyof typeof doctors];
//     const availableSlots = await getAvailableSlots(doctorId, date);
//     if (!availableSlots.includes(time)) {
//       return {
//         success: false,
//         message: `The time slot ${time} is not available for ${doctor.name} on ${date}. Available slots: ${availableSlots.join(", ")}`,
//       };
//     }
//     const newAppointment = new Appointment({
//       patientName,
//       patientAge,
//       patientPhone,
//       doctorId,
//       doctorName: doctor.name,
//       date,
//       time,
//       treatment,
//     });
//     await newAppointment.save();
//     return {
//       success: true,
//       appointmentId: newAppointment._id,
//       message: `Appointment booked successfully for ${patientName} with ${doctor.name} on ${date} at ${time}`,
//     };
//   },

//   cancelAppointment: async ({ appointmentId }: { appointmentId: string }) => {
//     const appointment = await Appointment.findByIdAndDelete(appointmentId);
//     if (!appointment) {
//       return { success: false, message: `No appointment found with ID ${appointmentId}` };
//     }
//     return {
//       success: true,
//       message: `Appointment for ${appointment.patientName} with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been cancelled.`,
//     };
//   },

//   getAppointments: async ({ patientPhone }: { patientPhone: string }) => {
//     const patientAppointments = await Appointment.find({ patientPhone });
//     if (patientAppointments.length === 0) {
//       return { appointments: [], message: `No appointments found for ${patientPhone}` };
//     }
//     return { appointments: patientAppointments, message: `Found ${patientAppointments.length} appointments.` };
//   },

//   getDoctorInfo: async ({ doctorId }: { doctorId?: string }) => {
//     if (!doctorId || doctorId === "both") {
//       return { doctors: Object.values(doctors), message: "Here is information about our doctors:" };
//     }
//     return { doctor: doctors[doctorId as keyof typeof doctors], message: "Doctor details:" };
//   },
// ];
// export default tools
