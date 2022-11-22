import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { search, setSearch } = useContext(AppContext);
  return (
    <form>
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          value={ search }
          data-testid="name-filter"
          onChange={ (e) => setSearch(e.target.value) }
        />
      </label>
    </form>
  );
}

export default Filters;
