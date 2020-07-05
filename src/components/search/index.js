import React, { useState } from 'react';
import './Search.scss';

const SearchComponent = ({ search }) => {
  const [queryTxt, setQueryTxt] = useState('');

  const onQueryChange = e => {
    setQueryTxt(e.target.value);
  };

  const resetSearchQuery = () => {
    setQueryTxt('');
  };

  const onSearchFunction = e => {
    e.preventDefault();
    search(queryTxt);
  };

  const deleteBtnClass = `delete-icon ${queryTxt !== '' ? 'show': ''}`;

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={onSearchFunction}>
        <div className="search-icon"></div>
        <input
          className="search-input"
          placeholder="Search movie"
          value={queryTxt}
          onChange={onQueryChange}
          type="text"
        ></input>
        <div className={deleteBtnClass} onClick={resetSearchQuery}></div>
      </form>
    </div>
  );
};

export default SearchComponent;
