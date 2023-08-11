/* eslint-disable */

import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types"

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)


    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }

    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button style={{ width: "100%", backgroundColor: "#4CAF50", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable