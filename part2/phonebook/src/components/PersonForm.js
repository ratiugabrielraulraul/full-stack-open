import React from 'react';


const PersonForm = ({ addPerson, newName, handleNameChange, handleNewNumbers }) => {

    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    <h2>Add new</h2>
                    name: <input value={newName.name} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newName.number} onChange={handleNewNumbers} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm