
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

const treatments = {
  rhinoplasty: {
    tratment: "Rhinoplasty",
    summaery: "Rhinoplasty is a surgical procedure that reshapes or repairs the nose to improve its appearance or function.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  facelift: {
    tratment: "Facelift",
    summaery: "A facelift is a cosmetic surgery that tightens and lifts facial skin and tissues to reduce visible signs of aging.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  lipfillers: {
    tratment: "Lip Fillers",
    summaery: "Lip fillers are injectable treatments that add volume, shape, and definition to the lips for a fuller appearance.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  upperarmlift: {
    tratment: "Upper Arm Lift",
    summaery: "An upper arm lift is a surgical procedure that removes excess skin and fat from the upper arms to create a more toned and contoured appearance.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
  tummytuck: {
    tratment: "Tummy Tuck",
    summaery: "A tummy tuck is a surgical procedure that removes excess skin and fat from the abdomen and tightens the abdominal muscles for a flatter, firmer midsection.",
    startingPrice: "7500",
    priceRange: [7500, 1200]
  },
}

const genericPreOp = [
  "Stop smoking and vaping at least 4 weeks before surgery.",
  "Avoid alcohol for 48-72 hours pre-op.",
  "Hold blood thinners, NSAIDs, and certain supplements (fish oil, vitamin E, ginkgo) 7-10 days before, only with surgeon approval.",
  "Complete all required labs/clearances; bring results and ID on surgery day.",
  "No food for 8 hours; clear liquids up to 2 hours before unless told otherwise.",
  "Arrange a responsible adult to drive you home and stay with you for 24 hours.",
  "Prepare your recovery area: compression garments, pillows, ice packs, medications, and easy meals.",
];

const genericPostOp = [
  "Take medications exactly as prescribed; avoid additional NSAIDs unless cleared.",
  "Keep dressings clean and dry; do not remove until instructed.",
  "Sleep with head elevated (for facial procedures) or as directed for your procedure.",
  "Walk short distances 3-5 times/day to reduce clot risk unless told otherwise.",
  "No strenuous activity, heavy lifting, or bending for 2 weeks or as directed.",
  "Avoid nicotine and alcohol during recovery.",
  "Call immediately for fever >38°C, calf pain/swelling, shortness of breath, chest pain, uncontrolled bleeding, or worsening/asymmetric swelling.",
  "Attend all follow-up appointments; bring your questions and medication list.",
];
export type DoctorId = keyof typeof doctors | "both";

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
      message: `Details for Dr. ${doctor.name}:`,
    }
  },
  getPrePostOpGuidance: async ({ procedure }: { procedure?: string }) => {
    const normalized = procedure?.trim();

    const procedureTips: any = {
      rhinoplasty: {
        pre: [
          "Avoid upper respiratory infections; reschedule if you are ill.",
          "Stop intranasal sprays unless specifically instructed.",
        ],
        post: [
          "Do not blow your nose for 2 weeks; sneeze with mouth open.",
          "Keep head elevated; use cold compresses to reduce swelling/bruising.",
        ],
      },
      facelift: {
        pre: ["Avoid hair coloring 1 week pre-op; plan gentle hair care post-op."],
        post: [
          "Keep head elevated; avoid turning neck sharply.",
          "Do not apply heat to face/neck; only gentle cool compress per instructions.",
        ],
      },
      tummy_tuck: {
        pre: ["Arrange help for standing/walking slightly flexed after surgery."],
        post: [
          "Walk slightly bent at the waist for 3-5 days to reduce tension on incision.",
          "Wear compression garment continuously as directed; monitor drains if placed.",
        ],
      },
      liposuction: {
        pre: ["Ensure compression garments fit and are available before surgery."],
        post: [
          "Expect fluid drainage in first 24-48 hours; use absorbent pads.",
          "Wear compression as directed to control swelling and contour.",
        ],
      },
    };
    const key = normalized?.toLowerCase().replace(/\s+/g, "_") ?? "";
    const specific = key && procedureTips[key];

    const pre = specific ? [...specific.pre, ...genericPreOp] : genericPreOp;
    const post = specific ? [...specific.post, ...genericPostOp] : genericPostOp;

    return {
      procedure: normalized || "general",
      preOp: pre,
      postOp: post,
      message: normalized
        ? `Pre-op and post-op guidance for ${normalized}:`
        : "General pre-op and post-op guidance:",
      disclaimer:
        "This guidance is informational and not a substitute for your surgeon's instructions. Always follow your care team's directions.",
    };
  },
  getTreatmentClinicOffer: async ({ treatment }: { treatment?: string }) => {
    // const normalized = treatment?.trim().toLowerCase() ?? ";"
    // if (!normalized || normalized === "all") {
    //   return {
    //     treatmentOffer: Object.values(treatmentOffer),
    //     message: "Here our popular treatment"
    //   }
    // }
    // const offer = treatmentOffer[normalized];
    // if (!offer) {
    //   return { message: "Currently not listed this treatment" };
    // }
    // return {
    //   offer,
    //   message: `Clinic offer${offer.treatment}`
    // }

    const normalized = treatment?.trim()?.toLowerCase().replace(/\s+/g, "_") ?? "";

    if (!normalized || normalized === "all") {
      return {
        offers: Object.values(treatments),
        message: "Here are our clinic offers for popular treatments:",
      };
    }

    const offer = treatments[normalized];
    if (!offer) {
      return {
        message: `We currently do not have a published offer for "${treatment ?? ""}". Available treatments: ${Object.keys(offers)
          .map(k => k.replace(/_/g, " "))
          .join(", ")}.`,
      };
    }

    return {
      offer,
      message: `Clinic offer for ${offer.treatment}:`,
    };
  }
};

export default tools;
