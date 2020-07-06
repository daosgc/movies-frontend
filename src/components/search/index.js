import React, { useState } from 'react';
import './Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const SearchComponent = ({ search }) => {
  const [queryTxt, setQueryTxt] = useState('');
  const [searchDone, setSearchDone] = useState(false);

  const onQueryChange = e => {
    setQueryTxt(e.target.value);
  };

  const resetSearchQuery = () => {
    if (searchDone) {
      search('');
    }
    setQueryTxt('');
    setSearchDone(false);
  };

  const onSearchFunction = e => {
    e.preventDefault();
    search(queryTxt);
    setSearchDone(true);
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
