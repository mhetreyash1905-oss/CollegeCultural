import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISociety extends Document {
  name: string;
  tag: string;
  description: string;
  imageUrl: string;
  accentColor: string;
  order: number;
}

const SocietySchema = new Schema<ISociety>(
  {
    name: { type: String, required: true, trim: true },
    tag: { type: String, trim: true },
    description: { type: String },
    imageUrl: { type: String },
    accentColor: { type: String, default: '#7B2FF7' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Society: Model<ISociety> =
  (mongoose.models.Society as Model<ISociety>) ||
  mongoose.model<ISociety>('Society', SocietySchema);

export default Society;
