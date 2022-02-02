import got from "got";

export const getJsonPlaceholder = async (id) => {
  try {
    const { statusCode, body } = await got(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        retry: {
          limit: 1,
          methods: ["GET"],
        },
      }
    );
    const bodyObj = JSON.parse(body);
    if (bodyObj.id) delete bodyObj.id;
    return {
      id,
      statusCode,
      body: bodyObj,
    };
  } catch (error) {
    return {
      id,
      statusCode: "error",
    };
  }
};
