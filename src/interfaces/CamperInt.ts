import { Document } from "mongoose";

export interface CamperInt extends Document {
    discordId: string
    round: number
    day: number
    timestamp: number
}