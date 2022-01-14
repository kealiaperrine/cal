import { model, Schema } from "mongoose";
import { CamperInt } from "../../interfaces/CamperInt";

export const Camper = new Schema({
    //String refers to the JavaScript primitive type
    // string is the TypeScript type definition
    discordId: String,
    round: Number,
    day: Number,
    timestamp: Number,
});

export default model<CamperInt>("camper", Camper);