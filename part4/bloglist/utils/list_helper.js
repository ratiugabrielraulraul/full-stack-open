const blog = require("../models/blog");

const dummy = (blogs) => {

    return 1;
};

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((sum, post) => sum + post.likes, 0)
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return null; }

    const mostFavBlog = blogs.reduce((previous, current) => {
        return previous.likes > current.likes ? previous : current
    })

    return {
        title: mostFavBlog.title,
        author: mostFavBlog.author,
        likes: mostFavBlog.likes
    }

}

module.exports = {
    dummy, totalLikes, favoriteBlog
}

