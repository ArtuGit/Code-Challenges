import express from 'express';
import {dbFindOne} from "./db.js";

export const app = express()

export const apiDescription = () => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({message: err.message}); // Bad request
    }
    next();
  });

  app.patch('/blog-post/:id', async function (req, res) {
    const {title, body} = req?.body
    if (title && body) {
      const dbBlogPost = (await dbFindOne(+req.params.id, {title, body})).value
      if (!dbBlogPost) {
        return res.status(403).send({message: "Blog Post is not found"});
      }
      return res.status(200).send(dbBlogPost);
    } else {
      return res.status(400).send({message: "Missed title or body"});
    }

  })
}