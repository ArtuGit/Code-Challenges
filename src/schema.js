import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BlogPostSchema = new Schema({
  id: String,
  userId: String,
  title: String,
  body: String,
}).index({userId: 1});

export const BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);
