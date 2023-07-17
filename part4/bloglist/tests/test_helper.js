const Blog = require('../models/blog');

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
module.exports = {
    intialBlogs,
    nonExistingId,
    blogsInDb
}