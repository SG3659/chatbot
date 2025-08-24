import Appointment from "../model/appointment-model.js";
const doctors = {
  andre: {
    id: "andre",
    name: "Andre P. Marshall, M.D., MPH, F.A.C.S.",
    specialties: ["Rhinoplasty", "Facelift", "Lip Fillers"],
    bio: "Dr. Andre P. Marshall is a board-certified plastic surgeon specializing in facial rejuvenation and cosmetic enhancements.",
    experience: "15+ years",
    education: "Harvard Medical School",
    consultationFee: "$150",
    languages: ["English"],
    location: "New York, USA",
  },
  catherine: {
    id: "catherine",
    name: "Catherine Loflin, MD, FACS",
    specialties: ["Upper Arm Lift", "Tummy Tuck", "Facelift"],
    bio: "Dr. Catherine Loflin is a board-certified plastic surgeon with expertise in body contouring and reconstructive surgery.",
    experience: "12+ years",
    education: "Stanford University School of Medicine",
    consultationFee: "$140",
    languages: ["English", "Spanish"],
    location: "Los Angeles, USA",
  },
  michael: {
    id: "michael",
    name: "Michael Torres, M.D.",
    specialties: ["Hair Transplant", "Beard Transplant", "PRP Therapy"],
    bio: "Dr. Michael Torres is a renowned cosmetic surgeon focused on hair restoration and regenerative treatments.",
    experience: "10+ years",
    education: "University of Miami Miller School of Medicine",
    consultationFee: "$120",
    languages: ["English", "Portuguese"],
    location: "Miami, USA",
  },
  sophia: {
    id: "sophia",
    name: "Sophia Bennett, M.D., Ph.D.",
    specialties: ["Breast Augmentation", "Breast Lift", "Breast Reduction"],
    bio: "Dr. Sophia Bennett is a plastic surgeon dedicated to helping patients achieve natural results in breast surgeries.",
    experience: "14+ years",
    education: "Johns Hopkins University",
    consultationFee: "$160",
    languages: ["English", "French"],
    location: "Boston, USA",
  },
  rajesh: {
    id: "rajesh",
    name: "Rajesh Malhotra, M.S., M.Ch.",
    specialties: ["Liposuction", "Tummy Tuck", "Mommy Makeover"],
    bio: "Dr. Rajesh Malhotra is a leading surgeon in advanced body contouring procedures and post-pregnancy transformations.",
    experience: "18+ years",
    education: "All India Institute of Medical Sciences (AIIMS)",
    consultationFee: "$110",
    languages: ["English", "Hindi"],
    location: "New Delhi, India",
  },
  emily: {
    id: "emily",
    name: "Emily Carter, M.D.",
    specialties: ["Non-Surgical Nose Job", "Botox", "Dermal Fillers"],
    bio: "Dr. Emily Carter is a cosmetic physician specializing in minimally invasive and non-surgical facial enhancements.",
    experience: "9+ years",
    education: "Columbia University Medical Center",
    consultationFee: "$100",
    languages: ["English"],
    location: "Chicago, USA",
  },
  david: {
    id: "david",
    name: "David Kim, M.D., F.A.C.S.",
    specialties: ["Eyelid Surgery", "Asian Blepharoplasty", "Brow Lift"],
    bio: "Dr. David Kim is a double board-certified surgeon with expertise in eyelid and facial rejuvenation surgeries.",
    experience: "20+ years",
    education: "Seoul National University College of Medicine",
    consultationFee: "$170",
    languages: ["English", "Korean"],
    location: "San Francisco, USA",
  },
  isabella: {
    id: "isabella",
    name: "Isabella Rossi, M.D.",
    specialties: ["Brazilian Butt Lift", "Thigh Lift", "Liposculpture"],
    bio: "Dr. Isabella Rossi specializes in body contouring with a focus on achieving natural, sculpted results.",
    experience: "11+ years",
    education: "University of Milan",
    consultationFee: "$130",
    languages: ["English", "Italian"],
    location: "Milan, Italy",
  },
  ethan: {
    id: "ethan",
    name: "Ethan Walker, D.O.",
    specialties: ["Gynecomastia Surgery", "Chest Implants", "Liposuction"],
    bio: "Dr. Ethan Walker is known for his expertise in male plastic surgery and body sculpting procedures.",
    experience: "13+ years",
    education: "New York Institute of Technology College of Osteopathic Medicine",
    consultationFee: "$125",
    languages: ["English"],
    location: "Houston, USA",
  },
  akira: {
    id: "akira",
    name: "Akira Tanaka, M.D.",
    specialties: ["Jawline Contouring", "Chin Augmentation", "Cheek Implants"],
    bio: "Dr. Akira Tanaka is a maxillofacial and plastic surgeon specializing in facial bone contouring and enhancement.",
    experience: "16+ years",
    education: "University of Tokyo",
    consultationFee: "$180",
    languages: ["English", "Japanese"],
    location: "Tokyo, Japan",
  },
  olivia: {
    id: "olivia",
    name: "Olivia Martinez, M.D.",
    specialties: ["Skin Resurfacing", "Chemical Peels", "Laser Treatments"],
    bio: "Dr. Olivia Martinez is a dermatologist and cosmetic surgeon focusing on skin rejuvenation and anti-aging treatments.",
    experience: "8+ years",
    education: "University of Barcelona",
    consultationFee: "$90",
    languages: ["English", "Spanish"],
    location: "Barcelona, Spain",
  },
  william: {
    id: "william",
    name: "William Johnson, M.D., F.A.C.S.",
    specialties: ["Neck Lift", "Facelift", "Earlobe Repair"],
    bio: "Dr. William Johnson is an experienced plastic surgeon known for precision in neck and facial surgeries.",
    experience: "22+ years",
    education: "University of California, San Diego",
    consultationFee: "$175",
    languages: ["English"],
    location: "San Diego, USA",
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
    ],
    post: [
      "Do not blow your nose for 2 weeks; sneeze with mouth open.",
      "Keep head elevated; use cold compresses to reduce swelling/bruising.",
      "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
      "Keep dressings clean and dry; do not remove until instructed.",
      "Avoid strenuous activity, heavy lifting, or bending for 2 weeks.",
    ],
  },

  facelift: {
    id: "facelift",
    name: "Facelift",
    pre: [
      "Avoid hair coloring 1 week pre-op.",
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Hold blood thinners and certain supplements 7–10 days before surgery.",
      "Arrange a responsible adult to drive you home and stay with you for 24 hours.",
    ],
    post: [
      "Keep head elevated; avoid turning neck sharply.",
      "Do not apply heat; only cool compresses as instructed.",
      "Take medications as prescribed; avoid additional NSAIDs unless cleared.",
      "No strenuous activity, heavy lifting, or bending for 2 weeks.",
    ],
  },

  tummytuck: {
    id: "tummytuck",
    name: "Tummy Tuck",
    pre: [
      "Arrange help for standing/walking slightly flexed after surgery.",
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Avoid alcohol for 48-72 hours pre-op.",
      "Prepare your recovery area with pillows, compression garment, and easy meals.",
    ],
    post: [
      "Walk slightly bent at the waist for 3-5 days to reduce tension.",
      "Wear compression garment continuously as directed.",
      "Monitor surgical drains and record output if placed.",
      "Avoid strenuous activity, heavy lifting, or bending for 4-6 weeks.",
    ],
  },

  lipfillers: {
    id: "lipfillers",
    name: "Lip Fillers",
    pre: [
      "Avoid alcohol and caffeine 24 hours before treatment.",
      "Stop blood thinners, NSAIDs, and supplements like fish oil 7 days before (with approval).",
      "Arrive with a clean face, free of makeup or creams.",
    ],
    post: [
      "Do not touch, press, or massage lips for 24 hours.",
      "Apply cold compresses to reduce swelling.",
      "Avoid makeup, alcohol, and strenuous exercise for 24 hours.",
      "Do not schedule dental work or vaccinations within 2 weeks.",
    ],
  },

  breastaugmentation: {
    id: "breastaugmentation",
    name: "Breast Augmentation",
    pre: [
      "Stop smoking and vaping at least 4 weeks before surgery.",
      "Avoid blood thinners and NSAIDs 7–10 days before surgery.",
      "Arrange a ride home and caregiver for 24 hours post-surgery.",
    ],
    post: [
      "Wear a surgical bra as directed.",
      "Avoid lifting arms above shoulder height for 2 weeks.",
      "Sleep on your back, not your stomach, for at least 4 weeks.",
      "Attend all follow-up appointments for implant checks.",
    ],
  },

  liposuction: {
    id: "liposuction",
    name: "Liposuction",
    pre: [
      "Maintain stable weight for at least 3 months before surgery.",
      "Avoid blood thinners, NSAIDs, and certain supplements for 7-10 days before surgery.",
      "Hydrate well before surgery.",
    ],
    post: [
      "Wear compression garment for 4–6 weeks.",
      "Expect swelling and bruising for 2–4 weeks.",
      "Walk short distances daily to reduce clot risk.",
      "Avoid heavy exercise for 4 weeks.",
    ],
  },

  eyelidsurgery: {
    id: "eyelidsurgery",
    name: "Eyelid Surgery (Blepharoplasty)",
    pre: [
      "Avoid contact lenses for at least 1 week pre-op.",
      "Stop smoking 4 weeks before surgery.",
      "Do not wear makeup on surgery day.",
    ],
    post: [
      "Keep head elevated and apply cold compresses.",
      "Avoid reading, TV, and screen use for long periods in first 48 hours.",
      "Do not rub your eyes.",
      "Wear sunglasses outdoors to protect from wind and sun.",
    ],
  },

  butlift: {
    id: "butlift",
    name: "Brazilian Butt Lift (BBL)",
    pre: [
      "Achieve stable weight before surgery.",
      "Stop smoking and alcohol at least 4 weeks before.",
      "Prepare compression garments and soft pillows for recovery.",
    ],
    post: [
      "Do not sit directly on buttocks for 2–3 weeks; use a BBL pillow.",
      "Wear compression garment continuously.",
      "Avoid strenuous activities for at least 6 weeks.",
      "Maintain stable weight for long-lasting results.",
    ],
  },

  botox: {
    id: "botox",
    name: "Botox",
    pre: [
      "Avoid alcohol and blood thinners 24 hours before treatment.",
      "Arrive with a clean face free of makeup.",
    ],
    post: [
      "Do not rub or massage treated area for 24 hours.",
      "Stay upright for 4 hours post-treatment.",
      "Avoid strenuous activity and heat exposure for 24 hours.",
    ],
  },
};


const treatments = {
  rhinoplasty: {
    id: "rhinoplasty",
    treatment: "Rhinoplasty",
    summary: "Rhinoplasty is a surgical procedure that reshapes or repairs the nose to improve its appearance or function.",
    startingPrice: "7500",
    priceRange: [7500, 12000],
  },
  facelift: {
    id: "facelift",
    treatment: "Facelift",
    summary: "A facelift is a cosmetic surgery that tightens and lifts facial skin and tissues to reduce visible signs of aging.",
    startingPrice: "8000",
    priceRange: [8000, 15000],
  },
  lipfillers: {
    id: "lipfillers",
    treatment: "Lip Fillers",
    summary: "Lip fillers are injectable treatments that add volume, shape, and definition to the lips for a fuller appearance.",
    startingPrice: "500",
    priceRange: [500, 2000],
  },
  upperarmlift: {
    id: "upperarmlift",
    treatment: "Upper Arm Lift",
    summary: "An upper arm lift removes excess skin and fat from the upper arms to create a more toned and contoured appearance.",
    startingPrice: "6000",
    priceRange: [6000, 10000],
  },
  tummytuck: {
    id: "tummytuck",
    treatment: "Tummy Tuck",
    summary: "A tummy tuck removes excess skin and fat from the abdomen and tightens the abdominal muscles for a flatter, firmer midsection.",
    startingPrice: "9000",
    priceRange: [9000, 15000],
  },
  breastaugmentation: {
    id: "breastaugmentation",
    treatment: "Breast Augmentation",
    summary: "Breast augmentation enhances breast size and shape using implants or fat transfer for a more proportionate figure.",
    startingPrice: "7000",
    priceRange: [7000, 12000],
  },
  liposuction: {
    id: "liposuction",
    treatment: "Liposuction",
    summary: "Liposuction removes excess fat deposits from specific areas of the body to improve body contours and proportion.",
    startingPrice: "4000",
    priceRange: [4000, 10000],
  },
  eyelidsurgery: {
    id: "eyelidsurgery",
    treatment: "Eyelid Surgery",
    summary: "Eyelid surgery rejuvenates the eyes by removing excess skin, muscle, and fat from the upper and/or lower eyelids.",
    startingPrice: "3500",
    priceRange: [3500, 8000],
  },
  butlift: {
    id: "butlift",
    treatment: "Brazilian Butt Lift",
    summary: "A Brazilian Butt Lift enhances the shape and size of the buttocks using fat transfer from other areas of the body.",
    startingPrice: "8000",
    priceRange: [8000, 14000],
  },
  botox: {
    id: "botox",
    treatment: "Botox",
    summary: "Botox injections temporarily relax facial muscles to reduce the appearance of fine lines and wrinkles.",
    startingPrice: "300",
    priceRange: [300, 1000],
  },
};


export type DoctorId = keyof typeof doctors | "all";
export type ProcedureTipsID = keyof typeof procedureTips | "all"
export type TreatmentID = keyof typeof treatments | "all"

async function checkDoctorAvailability({ doctorName, date, time }: { doctorName?: string; date?: string; time?: string; }) {
  if (!doctorName || !date || !time) {
    return { available: false, message: "Missing doctorName, date, or time." };
  }
  const existing = await Appointment.findOne({ doctorName, date, time }).lean();
  if (existing) {
    return { available: false, message: `Slot not available. Dr. ${doctorName} already has an appointment on ${date} at ${time}.` };
  }
  return { available: true, message: "Slot is available." };
}

export const tools = {
  getDoctorInfo: async ({ doctorId }: { doctorId?: DoctorId }) => {
    if (!doctorId || doctorId === "all") {
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
  checkDoctorAvailability,
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
      const sanitized = {
        patientName: String(patientName).trim(),
        doctorName: String(doctorName).trim(),
        date: String(date).trim(),
        time: String(time).trim(),
        treatment: String(treatment).trim(),
      }

      const availability = await checkDoctorAvailability({ doctorName, date, time });
      if (!availability.available) {
        return { message: availability.message };
      }
      const newAppointment = new Appointment(sanitized);
      await newAppointment.save();
      return {
        newAppointment,
        message: `Appointment scheduled with Dr. ${sanitized.doctorName} on ${sanitized.date} at ${sanitized.time} for ${sanitized.treatment}.`

      }
    } catch (error: any) {
      console.error("Error saving appointment:", error);
      return {
        message: "Failed to schedule appointment. Please try again later."
      };
    }
  },
};

export default tools;
