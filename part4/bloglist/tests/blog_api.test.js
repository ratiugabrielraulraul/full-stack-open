const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const { json, application } = require('express');

const api = supertest(app);
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.intialBlogs)
})

/**
 *The test makes an HTTP GET request to the api/blogs url and verifies that the request is responded to with the status code 200.
 * It also verifies that the Content-Type header is set to application/json, indicating that the data is in the desired format.
 */
describe("when there is  initially some blogs saved", () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id property instead of_id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)

    for (const id of ids) {
      expect(id).toBeDefined();
    }

  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.intialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'Cross fit'
    )
  })
})
describe("viewing a specific note", () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "idk",
      author: "Author",
      url: "https://example.com",
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      // in case we forgot to respond with a status 201 in blogsRouter post the test fails with 200(ok)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.intialBlogs.length + 1)
  })

  // test blog with missing field 

  test('blog without author is not added', async () => {
    const newBlog = {
      title: "ABCD",
      url: "https://example.com",
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.intialBlogs.length)
  })
})
describe('Removing a blog', () => {
  test('status code 204 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.intialBlogs.length - 1)

  })
})
describe("updating a blog", () => {
  test("succeeds with status 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 10 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];
    expect(blogsAtEnd).toHaveLength(helper.intialBlogs.length);
    expect(updatedBlog.likes).toBe(5);
  });
});

//afterAll jest func
afterAll(async () => {
  await mongoose.connection.close()
})