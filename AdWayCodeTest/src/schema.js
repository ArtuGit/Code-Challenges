import mongoose from "mongoose";

const { Schema } = mongoose;

export const BlogPostSchema = new Schema({
  id: String,
  userId: String,
  title: String,
  body: String,
  updatedByUser: Boolean,
}).index({ userId: 1 });

export const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);
