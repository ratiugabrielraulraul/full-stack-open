import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
import { appStyles, headerStyles, inputStyles } from "../styles"

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };


  return(
    <div style={appStyles}>
      <div style={{ ...headerStyles, fontSize: '20px' }}>Filter</div>
      <input
        onChange={handleChange}
        style={{ ...inputStyles, width: '50%' }}
        placeholder="Search..."
      />
    </div>
  );
};

export default Filter;
