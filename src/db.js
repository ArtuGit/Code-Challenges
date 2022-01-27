import {BlogPostModel} from "./schema.js";

export const upsertBlogPost = async (id, payload) => {
  try {
    await BlogPostModel.collection.bulkWrite([
      {
        'updateOne': {
          'filter': {id},
          'update': {'$set': payload},
          'upsert': true,
        }
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}