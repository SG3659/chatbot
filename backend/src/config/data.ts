import Mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


const connect = ():void => {
   const mongoUri = process.env.MONGODB_URL;
   // console.log(mongoUri)
   if (!mongoUri) {
      
     console.error("MONGODB_URL is not defined in the environment variables.");
     return;
   }

  Mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err: Error) => {
      console.log("DB connection problem");
      console.error(err);
    });
};
// const mongoUri:string = process.env.MONGODB_URL as string ;

// const connect = async () => {
//   try {
//     if (!mongoUri) {
//       throw new Error("MONGODB_URL is not defined in the environment variables.");
//     }
//     await Mongoose.connect(mongoUri);
//     console.log("DB connected successfully");
//   } catch (error) {
//     console.error("DB connection error:", error);
//   }
// };

export default connect;
