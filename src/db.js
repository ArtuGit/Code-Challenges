import { BlogPostModel } from "./schema.js";

export const DbBulkUpsert = async (payload) => {
  const mongoUpsertOps = [];

  const idsFetched = payload.map((e) => e.id);
  const idsToExclude = (
    await BlogPostModel.collection
      .find({ id: { $in: idsFetched }, updatedByUser: true })
      .toArray()
  ).map((e) => e.id);

  const idsToUpdate = idsFetched.filter((e) => idsToExclude.indexOf(e) < 0);

  idsToUpdate.forEach((id) => {
    const { id: _id, ...dbPayload } = payload.find((e) => e.id === id);
    mongoUpsertOps.push({
      updateOne: {
        filter: { id },
        update: { $set: dbPayload, $setOnInsert: { updatedByUser: false } },
        upsert: true,
      },
    });
  });
  try {
    await BlogPostModel.collection.bulkWrite(mongoUpsertOps);
    return mongoUpsertOps.length;
  } catch (error) {
    console.error(error);
  }
};

export const dbFindOne = async (id, payload) => {
  console.log("payload", payload);
  try {
    return BlogPostModel.collection.findOneAndUpdate(
      { id },
      { $set: { ...payload, updatedByUser: true } },
      { returnDocument: "after" }
    );
  } catch (error) {
    console.error(error);
  }
};
