import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteConfig extends Document {
  heroImages: string[];
  contactEmail: string;
  contactAddress: string;
  contactPhone?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
  showFestCountdown: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SiteConfigSchema: Schema = new Schema(
  {
    heroImages: {
      type: [String],
      default: [],
    },
    contactEmail: {
      type: String,
      default: 'cultural@iiita.ac.in',
    },
    contactAddress: {
      type: String,
      default: 'IIIT Allahabad, Devghat, Jhalwa, Prayagraj, UP 211015',
    },
    contactPhone: {
      type: String,
    },
    socialLinks: {
      instagram: String,
      linkedin: String,
      facebook: String,
      twitter: String,
    },
    showFestCountdown: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

// We will only ever have one document in this collection
export const SiteConfig: Model<ISiteConfig> =
  mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);
