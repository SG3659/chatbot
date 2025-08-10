import Appointment from "../model/appointment-model.js";
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

const procedureTips = {
  rhinoplasty: {
    id: "rhinoplasty",
    name: "Rhinoplasty",
    pre: [
      "Avoid upper respiratory infections; reschedule if you are ill.",
      "Stop intranasal sprays unless specifically instructed.",
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Avoid alcohol for 48-72 hours pre-op.",
      "Hold blood thinners, NSAIDs, and certain supplements (fish oil, vitamin E, ginkgo) 7-10 days before, only with surgeon approval.",
      "Complete all required labs/clearances; bring results and ID on surgery day.",
      "No food for 8 hours; clear liquids up to 2 hours before unless told otherwise.",
      "Arrange a responsible adult to drive you home and stay with you for 24 hours.",
      "Prepare your recovery area: compression garments, pillows, ice packs, medications, and easy meals.",
    ],
    post: [
      "Do not blow your nose for 2 weeks; sneeze with mouth open.",
      "Keep head elevated; use cold compresses to reduce swelling/bruising.",
      "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
      "Keep dressings clean and dry; do not remove until instructed.",
      "Sleep with head elevated (for facial procedures) or as directed for your procedure.",
      "Walk short distances 3-5 times/day to reduce clot risk unless told otherwise.",
      "No strenuous activity, heavy lifting, or bending for 2 weeks or as directed.",
      "Avoid nicotine and alcohol during recovery.",
      "Call immediately for fever >38°C, calf pain/swelling, shortness of breath, chest pain, uncontrolled bleeding, or worsening/asymmetric swelling.",
      "Attend all follow-up appointments; bring your questions and medication list.",
    ],
  },
  facelift: {
    id: "facelift",
    name: "Facelift",
    pre: ["Avoid hair coloring 1 week pre-op; plan gentle hair care post-op.",
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Avoid alcohol for 48-72 hours pre-op.",
      "Hold blood thinners, NSAIDs, and certain supplements (fish oil, vitamin E, ginkgo) 7-10 days before, only with surgeon approval.",
      "Complete all required labs/clearances; bring results and ID on surgery day.",
      "No food for 8 hours; clear liquids up to 2 hours before unless told otherwise.",
      "Arrange a responsible adult to drive you home and stay with you for 24 hours.",
      "Prepare your recovery area: compression garments, pillows, ice packs, medications, and easy meals.",
    ],
    post: [
      "Keep head elevated; avoid turning neck sharply.",
      "Do not apply heat to face/neck; only gentle cool compress per instructions.",
      "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
      "Keep dressings clean and dry; do not remove until instructed.",
      "Sleep with head elevated (for facial procedures) or as directed for your procedure.",
      "Walk short distances 3-5 times/day to reduce clot risk unless told otherwise.",
      "No strenuous activity, heavy lifting, or bending for 2 weeks or as directed.",
      "Avoid nicotine and alcohol during recovery.",
      "Call immediately for fever >38°C, calf pain/swelling, shortness of breath, chest pain, uncontrolled bleeding, or worsening/asymmetric swelling.",
      "Attend all follow-up appointments; bring your questions and medication list.",
    ],
  },
  tummytuck: {
    id: "tummytuck",
    name: "Tummy Tuck",
    pre: ["Arrange help for standing/walking slightly flexed after surgery.",
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Avoid alcohol for 48-72 hours pre-op.",
      "Hold blood thinners, NSAIDs, and certain supplements (fish oil, vitamin E, ginkgo) 7-10 days before, only with surgeon approval.",
      "Complete all required labs/clearances; bring results and ID on surgery day.",
      "No food for 8 hours; clear liquids up to 2 hours before unless told otherwise.",
      "Arrange a responsible adult to drive you home and stay with you for 24 hours.",
      "Prepare your recovery area: compression garments, pillows, ice packs, medications, and easy meals.",
    ],
    post: [
      "Walk slightly bent at the waist for 3-5 days to reduce tension on incision.",
      "Wear compression garment continuously as directed; monitor drains if placed.",
      "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
      "Keep dressings clean and dry; do not remove until instructed.",
      "Sleep with head elevated (for facial procedures) or as directed for your procedure.",
      "Walk short distances 3-5 times/day to reduce clot risk unless told otherwise.",
      "No strenuous activity, heavy lifting, or bending for 2 weeks or as directed.",
      "Avoid nicotine and alcohol during recovery.",
      "Call immediately for fever >38°C, calf pain/swelling, shortness of breath, chest pain, uncontrolled bleeding, or worsening/asymmetric swelling.",
      "Attend all follow-up appointments; bring your questions and medication list.",
    ],
  },
  lipfillers: {
    id: "lipfillers",
    name: "Lip Fillers",
    pre: ["Ensure compression garments fit and are available before surgery.",
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Avoid alcohol for 48-72 hours pre-op.",
      "Hold blood thinners, NSAIDs, and certain supplements (fish oil, vitamin E, ginkgo) 7-10 days before, only with surgeon approval.",
      "Complete all required labs/clearances; bring results and ID on surgery day.",
      "No food for 8 hours; clear liquids up to 2 hours before unless told otherwise.",
      "Arrange a responsible adult to drive you home and stay with you for 24 hours.",
      "Prepare your recovery area: compression garments, pillows, ice packs, medications, and easy meals.",
      "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
      "Keep dressings clean and dry; do not remove until instructed.",
      "Sleep with head elevated (for facial procedures) or as directed for your procedure.",
      "Walk short distances 3-5 times/day to reduce clot risk unless told otherwise.",
      "No strenuous activity, heavy lifting, or bending for 2 weeks or as directed.",
      "Avoid nicotine and alcohol during recovery.",
      "Call immediately for fever >38°C, calf pain/swelling, shortness of breath, chest pain, uncontrolled bleeding, or worsening/asymmetric swelling.",
      "Attend all follow-up appointments; bring your questions and medication list.",
    ],
    post: [
      "Expect fluid drainage in first 24-48 hours; use absorbent pads.",
      "Wear compression as directed to control swelling and contour.",
      "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
      "Keep dressings clean and dry; do not remove until instructed.",
      "Sleep with head elevated (for facial procedures) or as directed for your procedure.",
      "Walk short distances 3-5 times/day to reduce clot risk unless told otherwise.",
      "No strenuous activity, heavy lifting, or bending for 2 weeks or as directed.",
      "Avoid nicotine and alcohol during recovery.",
      "Call immediately for fever >38°C, calf pain/swelling, shortness of breath, chest pain, uncontrolled bleeding, or worsening/asymmetric swelling.",
      "Attend all follow-up appointments; bring your questions and medication list.",
    ],
  },
};

const treatments = {
  rhinoplasty: {
    id: "rhinoplasty",
    treatment: "Rhinoplasty",
    summary: "Rhinoplasty is a surgical procedure that reshapes or repairs the nose to improve its appearance or function.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  facelift: {
    id: "face lift",

    treatment: "Facelift",
    summary: "A facelift is a cosmetic surgery that tightens and lifts facial skin and tissues to reduce visible signs of aging.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  lipfillers: {
    id: "lip fillers",
    treatment: "Lip Fillers",
    summary: "Lip fillers are injectable treatments that add volume, shape, and definition to the lips for a fuller appearance.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  upperarmlift: {
    id: "upper arm lift",
    treatment: "Upper Arm Lift",
    summary: "An upper arm lift is a surgical procedure that removes excess skin and fat from the upper arms to create a more toned and contoured appearance.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  tummytuck: {
    id: "tummy tuck",
    treatment: "Tummy Tuck",
    summary: "A tummy tuck is a surgical procedure that removes excess skin and fat from the abdomen and tightens the abdominal muscles for a flatter, firmer midsection.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
}

export type DoctorId = keyof typeof doctors | "both";
export type ProcedureTipsID = keyof typeof procedureTips | "all"
export type TreatmentID = keyof typeof procedureTips | "all"

export const tools = {
  getDoctorInfo: async ({ doctorId }: { doctorId?: DoctorId }) => {
    if (!doctorId || doctorId === "both") {
      return {
        doctors: Object.values(doctors),
        message: "Here is information about our doctors:",
      };
    }

    const doctor = doctors[doctorId];
    if (!doctor) {
      return { message: "Doctor not found." };
    }

    return {
      doctor,
      message: `Dr. ${doctor.name}:`,
    }
  },
  getPrePostOpGuidance: async ({ procedureId }: { procedureId?: ProcedureTipsID }) => {
    if (!procedureId || procedureId === "all") {
      return {
        procedureTips: Object.values(procedureTips).map(({ id, ...rest }) => rest),
        message: "Here is list about pre pr post operation guidance  provided by clinic:",
      };
    }

    const procedure = procedureTips[procedureId]
    if (!procedure) {
      return { message: " Sorry, we could not find any pre- or post-operation guidance for the specified procedure." }
    }
    return {
      procedure,
      message: "Pre Or Post Operation Guidance"
    }
  },
  // getTreatmentClinicOffer: async ({ treatment }: { treatment?: string }) => {
  //   const normalized = treatment?.trim()?.toLowerCase() ?? "";

  //   if (!normalized || normalized === "all") {
  //     return {
  //       offers: Object.values(treatments),
  //       message: "Here are our clinic offers for popular treatments:",
  //     };
  //   }

  //   const offer = treatments[normalized];
  //   if (!offer) {
  //     return {
  //       message: `We currently do not have a published offer for "${treatment ?? ""}".`
  //     };
  //   }

  //   return {
  //     offer,
  //     message: `Clinic offer for ${offer.treatment}:`,
  //   };
  // }
  getTreatmentClinicOffer: async ({ treatmentId }: { treatmentId?: TreatmentID }) => {
    if (!treatmentId || treatmentId === "all") {
      return {
        treatments: Object.values(treatments).map(({ id, ...rest }) => rest),
        message: "Here is information about Treatment offer by this clinic:",
      };
    }
    const treatment = treatments[treatmentId];
    if (!treatment) {
      return { message: "We currently do not have a published offer" }

    }
    return {
      treatment,
      message: "Treatment offer by this Clinic"
    }

  },
  scheduleAppointment: async ({ patientName, doctorName, date, time, treatment }: {
    patientName?: string;
    doctorName?: string;
    date?: string;
    time?: string;
    treatment?: string;
  }) => {
    try {
      if (!patientName || !doctorName || !date || !time || !treatment) {
        return {
          message: "Missing required details to schedule the appointment."
        }
      }

      const newAppointment = await Appointment.create({
        patientName, doctorName, date, time, treatment
      })
      newAppointment.save()
      return {
        newAppointment,
        message: `Appointment scheduled with Dr. ${doctorName} on ${date} at ${time} for ${treatment}.`

      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      return {
        message: "Failed to schedule appointment. Please try again later."
      };
    }
  }

};

export default tools;
