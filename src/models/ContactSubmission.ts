import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactSubmission: Model<IContactSubmission> =
  (mongoose.models.ContactSubmission as Model<IContactSubmission>) ||
  mongoose.model<IContactSubmission>(
    'ContactSubmission',
    ContactSubmissionSchema
  );

export default ContactSubmission;
