import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  order: number;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    date: { type: Date, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ||
  mongoose.model<IEvent>('Event', EventSchema);

export default Event;
