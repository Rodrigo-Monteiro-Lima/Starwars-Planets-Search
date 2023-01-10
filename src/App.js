import React, { useContext, useEffect } from 'react';
import './App.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Table from './components/Table';
import AppContext from './context/AppContext';
import Filters from './components/FIlters';

function App() {
  const { fetchPlanets, filters, handleRemoveFilter } = useContext(AppContext);
  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  }, []);
  return (
    <main>
      <div className="container">
        <Filters />
        <div className="filters-container">
          {filters.map((filter) => (
            <div
              key={ filter.column }
              data-testid="filter"
              style={ { display: 'flex', gap: '5px', alignItems: 'center' } }
            >
              <p>{`${filter.column} ${filter.comparison} ${filter.amount}`}</p>
              <button
                type="button"
                onClick={ () => handleRemoveFilter(filter.column) }
              >
                <MdOutlineDeleteForever />
              </button>
            </div>
          ))}
        </div>
        <Table />
      </div>
    </main>
  );
}

export default App;
