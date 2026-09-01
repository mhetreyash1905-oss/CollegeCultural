import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage extends Document {
  imageUrl: string;
  caption: string;
  order: number;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryImage: Model<IGalleryImage> =
  (mongoose.models.GalleryImage as Model<IGalleryImage>) ||
  mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);

export default GalleryImage;
