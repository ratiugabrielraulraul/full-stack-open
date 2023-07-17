// All of the routes
//All routes are now defined for the router object
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs)
//   })
// })

// blogsRouter.get('/:id', (request, response, next) => {
//     Blog.findById(request.params.id)
//         .then(blogs => {
//             if (blogs) {
//                 response.json(blogs)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch(error => next(error))
// })

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
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (body.title === undefined || body.author === undefined || body.url === undefined || body.likes === undefined) {
    return response.status(400).json({ error: "Fields are missing!" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });


  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  // blog.save()
  //   .then(savedBlog => {
  //     response.status(201).json(savedBlog);
  //   })
  // .catch(error => next(error));
});

module.exports = blogsRouter