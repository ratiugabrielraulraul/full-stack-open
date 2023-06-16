import React from 'react';


const Filter = ({ handleFilter, newFilter }) => {

    return (
        <div>
            filter shown with <input value={newFilter} onChange={handleFilter} />
        </div>
    )

}

export default Filter