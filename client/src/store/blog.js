import { create } from "zustand";

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  createBlog: async (newBlog) => {
    if (!newBlog.title || !newBlog.description || !newBlog.image) {
      return { success: false, message: "Please fill in all the fields" };
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    const data = await res.json();

    set((state) => ({ blogs: [...state.blogs, data.data] }));
    return { success: true, message: "Successfuly created new blog" };
  },
  fetchBlogs: async () => {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch data blogs");
      const data = await res.json();
      set({ blogs: data.data });
    } catch (error) {
      console.log(error);
    }
  },
  updateBlog: async (updatedBlog, id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(updatedBlog),
      });

      const data = await res.json();
      set((state) => ({
        blogs: state.blogs.map((blog) => (blog._id === id ? data.data : blog)),
      }));
      return { success: true, message: "Successfuly updated blog" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error updating blog" };
    }
  },
  deleteBlog: async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error({ success: false, message: res.message });

      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== id),
      }));
      return { success: true, message: "Successfuly deleted blog post" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error deleting blog post" };
    }
  },
}));

export default useBlogStore;
