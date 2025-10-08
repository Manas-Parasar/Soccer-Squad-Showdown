import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameLower: { type: String, required: true, lowercase: true, unique: true },
  team: { type: String },
  nationality: { type: String },
  age: { type: Number },
  image: { type: String },

  preferredPosition: { type: String, required: true },
  secondaryPositions: [{ type: String }],

  overallRating: { type: Number, required: true },
  pace: { type: Number, required: true },
  dribbling: { type: Number, required: true },
  passing: { type: Number, required: true },
  shooting: { type: Number, required: true },
  defending: { type: Number, required: true },
  physical: { type: Number, required: true },
});

const Player = mongoose.model("Player", playerSchema);
export default Player;
