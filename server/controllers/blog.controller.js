import mongoose from "mongoose";
import Blog from "../model/blog.model.js";

//ALL BLOGS
const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(404).json({ success: false, message: `No data found` });
  }
};

//CREATE BLOG
const createBlog = async (req, res) => {
  const blog = req.body;

  if (!blog.title || !blog.description || !blog.image) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  try {
    const newBlog = new Blog(blog);
    const addedBlog = await newBlog.save();
    res.status(200).json({ success: true, data: addedBlog });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `Error saving blog: ${err}` });
  }
};

//UPDATE BLOG
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid blog ID" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (err) {
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
};

//DELET BLOG
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ succes: false, message: "Invalid Blog ID" });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      succes: true,
      message: "Blog deleted",
      data: `Deleted Blog: ${deletedBlog.title}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: `Server Error: ${err} `,
    });
  }
};

export { allBlogs, updateBlog, createBlog, deleteBlog };
