
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(clearMessage);
    };
  });

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);

      //If there"s an error, the errorMessage state is set to "Wrong credentials" and cleared after 5 seconds.
    } catch (expection) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs([...blogs, blog]);
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} has been added!`);
    } catch (exception) {
      setMessage("Error creating blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };


  const updateLikes = async (id, blogToUpdate) => {
    console.log("Updating likes for blog:", id, blogToUpdate);
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
      console.log("Updated blogs array:", newBlogs);

    } catch (exception) {
      console.error("Error updating likes:", exception);
      setMessage("Error updating likes: " + exception.response.data.error);
    }
  };

  const deleteBlog = async (blogId) => {

    try {
      await blogService.remove(blogId);
      const updatedBlog = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(updatedBlog);
      setMessage("Blog removed!");
    } catch (exception) {
      setMessage("Error deleting blogs" + exception.response.data.error);
    }

  };

  return (
    <div>
      <h1 id="mainTitle">User Loggin</h1>
      <Notification message={message} isError={true} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div className="blog-container">
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>All Blogs:</h2>
          <Togglable buttonLabel="Create new blog">
            <BlogForm createBlog={createBlog}></BlogForm>
          </Togglable>

          {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
          ))}

          <p id="userLogged">User : {user.name} is logged in!</p>
          {user && <button id="logout" onClick={handleLogout}>Logout</button>}
        </div>
      )}
    </div>
  );
};
export default App;