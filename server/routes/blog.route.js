import express from "express";
import {
  allBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

//ALL BLOGS
router.get("/", allBlogs);

//CREATE BLOG
router.post("/", createBlog);

//UPDATE BLOG
router.put("/:id", updateBlog);

//DELETE BLOG
router.delete("/:id", deleteBlog);

export default router;
