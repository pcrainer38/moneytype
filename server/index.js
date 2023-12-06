import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import "dotenv/config";
import express from "express";

import path from "path";

import db from "./config/connection.js";

import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";

const __dirname = new URL(import.meta.url).pathname;

const PORT = process.env.PORT || 3000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers, cache: "bounded" });

await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: authMiddleware,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

await db.asPromise();

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Now listening on http://127.0.0.1:${PORT}`);
});
