import { useState, useRef } from "react";
import { useField } from "../hooks/index";

const CreateNew = (props) => {
    const { reset: resetContent, ...content } = useField("text");
    const { reset: resetAuthor, ...author } = useField("text");
    const { reset: resetInfo, ...info } = useField("text");

    const contentRef = useRef(null);



    const handleReset = (e) => {
        resetContent()
        resetAuthor()
        resetInfo()
        contentRef.current.focus()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        handleReset();

    };


    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} ref={contentRef}
                    />
                </div>
                <div>
                    author
                    <input {...author}
                    />
                </div>
                <div>
                    url for more info
                    <input {...info}
                    />
                </div>
                <button>create</button>
                <button type="button" onClick={handleReset}>reset</button>
            </form>
        </div>
    );
};


export default CreateNew