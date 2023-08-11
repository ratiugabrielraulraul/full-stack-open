import { useState } from "react";

const Blog = ({ blog, updateLikes, deleteBlog }) => {

  const [visible, setVisible] = useState(false);


  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateLikes(blog.id, updatedBlog);
    console.log("Like button clicked for blog:", blog.id);
  };
  const handleDelete = () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id);

  };

  return (
    <div className="blog">
      <div className="blog-header">
        <p><b>Title:</b> {blog.title} <b>Author:</b> {blog.author}</p>
        <button className="hide-show-btn" onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      {visible && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          <button id="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;