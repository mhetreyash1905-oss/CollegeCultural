import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICouncilMember extends Document {
  name: string;
  role: string;
  photoUrl: string;
  order: number;
}

const CouncilMemberSchema = new Schema<ICouncilMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String },
    photoUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CouncilMember: Model<ICouncilMember> =
  (mongoose.models.CouncilMember as Model<ICouncilMember>) ||
  mongoose.model<ICouncilMember>('CouncilMember', CouncilMemberSchema);

export default CouncilMember;
