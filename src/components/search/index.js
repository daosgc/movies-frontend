import React, { useState } from 'react';
import './Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

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
        <SearchIcon className="search-icon"/>
        <input
          className="search-input"
          placeholder="Search movie"
          value={queryTxt}
          onChange={onQueryChange}
          type="text"
        ></input>
        <ClearIcon className={deleteBtnClass} onClick={resetSearchQuery}/>
      </form>
    </div>
  );
};

export default SearchComponent;
