const Blog = require('../models/blog');
const User = require('../models/user');


const initialUsers = [
    {
      username: "hellas",
      name: "Arto Hellas",
      id: "627bd77f33e418039572306d",
    },
    {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "627bd7b233e4180395723071",
    },
  ];

const intialBlogs = [
    {
        title: "Exampleee",
        author: "John Doe",
        url: "https://example.com",
        likes: 5,
        id: "64ae7e904f735951a178507d"
    },
    {
        title: "Cross fit",
        author: "Herald Butler",
        url: "https://example.com",
        likes: 5,
        id: "64ae85ce4f735951a1785086"
    }
]

const nonExistingId = async () => {

    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString();
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
module.exports = {
    intialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    initialUsers
}