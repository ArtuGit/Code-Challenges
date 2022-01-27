import {BlogPostModel} from "./schema.js";

export const upsertBlogPost = async (id, payload) => {
  await BlogPostModel.collection.bulkWrite([
    {
      'updateOne': {
        'filter': {id},
        'update': {'$set': payload},
        'upsert': true,
      }
    },
  ]);
}