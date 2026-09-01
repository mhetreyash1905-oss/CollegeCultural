import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  publishedAt: Date;
  featured: boolean;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String },
    content: { type: String },
    coverImageUrl: { type: String },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BlogPost: Model<IBlogPost> =
  (mongoose.models.BlogPost as Model<IBlogPost>) ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
