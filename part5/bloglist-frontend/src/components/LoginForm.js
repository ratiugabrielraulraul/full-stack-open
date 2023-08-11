/* eslint-disable */

import React, { useState } from "react";
import PropTypes from "prop-types"


const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(username, password);
        setUsername("");
        setPassword("");
    };


    return (
        <div className="formControl">
            <form onSubmit={handleSubmit}>
                <div>
                    Username
                    <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)}></input>

                </div>
                <div>
                    Password
                    <input type="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)}></input>
                </div>
                <button id="submitButton" type="submit">Login</button>
            </form>
        </div>
    )
}
LoginForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default LoginForm;