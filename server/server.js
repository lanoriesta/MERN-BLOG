import express from "express";
import dotenv from "dotenv";
import mongoDB from "./db/db.js";
import router from "./routes/blog.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/blogs", router);

// console.log(process.env.MONGODB_URI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(__dirname, "client", "dist", "index.html");
  });
}

app.listen(PORT, () => {
  mongoDB();
  console.log(`BLOG server is running on http://localhost:${PORT}`);
});
