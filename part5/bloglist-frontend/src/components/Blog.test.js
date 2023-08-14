import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test('render title and author, but not URL or likes by default', () => {
    const blog = {
        title: "Living life",
        author: "John Doe",
        url: "www.example.com",
        likes: 5,
        user: {
            username: "username",
            password: "password"
        }
    };
    const component = render(<Blog key={blog.id} blog={blog} />)

    const titleElement = component.container.querySelector(".title");
    expect(titleElement).toHaveTextContent(blog.title);

    const authorElement = component.container.querySelector(".author");
    expect(authorElement).toHaveTextContent(blog.author);

    // expect(component.queryByText(blog.url)).not.toBeInTheDocument();

    const urlElement = component.container.querySelector('.url');
    expect(urlElement).toBeNull();

    expect(component.queryByText(blog.likes)).not.toBeInTheDocument();


});