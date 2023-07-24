// All of the routes
//All routes are now defined for the router object
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require("jsonwebtoken");



const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog)

  } else {
    response.status(404);
  }
})

// using async/await instead of prom
blogsRouter.get('/', async (request, response, next) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }



  if (body.title === undefined || body.author === undefined || body.url === undefined || body.likes === undefined) {
    return response.status(400).json({ error: "Fields are missing!" })
  }


  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });
  //When saving the blog post, we are also updating the user's blogs array with the new blog post's id
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON());
});



blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
})
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.request
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter