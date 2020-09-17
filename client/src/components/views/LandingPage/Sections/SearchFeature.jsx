import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature({ updateSearchTerm }) {
  const [ searchTerm, setSearchTerm ] = useState("");

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    updateSearchTerm(e.target.value);
  }

  return (
    <Search
      placeholder="input search text"
      onChange={searchHandler}
      value={searchTerm}
      style={{ width: 200 }}
    />
  )
}

export default SearchFeature
