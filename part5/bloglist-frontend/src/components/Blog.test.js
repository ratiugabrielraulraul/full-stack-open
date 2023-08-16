import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Blog from "./Blog";

describe("Blog tests block", () => {
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

    let component;
    const mockHandler = jest.fn();


    beforeEach(() => {
        component = render(<Blog key={blog.id} blog={blog} />)
    })



    test("render title and author, but not URL or likes by default", () => {


        const titleElement = component.container.querySelector(".title");
        expect(titleElement).toHaveTextContent(blog.title);

        const authorElement = component.container.querySelector(".author");
        expect(authorElement).toHaveTextContent(blog.author);

        // expect(component.queryByText(blog.url)).not.toBeInTheDocument();

        const urlElement = component.container.querySelector('.url');
        expect(urlElement).toBeNull();

        expect(component.queryByText(blog.likes)).not.toBeInTheDocument();


    }),

        test("check if url and likes are shown when button is clicked", () => {

            const button = component.container.querySelector(".hide-show-btn");
            fireEvent.click(button)

            const blogDetails = component.container.querySelector(".blog-details");
            expect(blogDetails).toBeInTheDocument();
        }),

        test("ensure that if like button is clicked twice, the event handler is called twice", () => {


            const button = component.container.getByText("like");
            fireEvent.click(button);
            fireEvent.click(button);

            expect(mockHandler.mock.calls).toHaveLength(2);

        })
});
