// models/Player.js
import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameLower: { type: String, required: true },
  team: { type: String, required: true },
  nationality: { type: String, required: true },
  age: { type: Number, required: true },
  imageUrl: { type: String },
  preferredPosition: { type: String, required: true },
  secondaryPositions: { type: [String], default: [] },
  overallRating: { type: Number, required: true },
  pace: { type: Number, required: true },
  dribbling: { type: Number, required: true },
  passing: { type: Number, required: true },
  shooting: { type: Number, required: true },
  defending: { type: Number, required: true },
  physical: { type: Number, required: true },
  goalkeeping: { type: Number, default: 0 },
});

export default mongoose.model("Player", PlayerSchema);
