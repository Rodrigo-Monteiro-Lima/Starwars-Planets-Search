import React, { useContext } from 'react';
import { MdSearch } from 'react-icons/md';
import AppContext from '../context/AppContext';
import './Filters.css';

function Filters() {
  const cols = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const {
    colOpt,
    search,
    setSearch,
    column,
    setColumn,
    comparison,
    setComparison,
    amount,
    setAmount,
    handleFilterButton,
    handleRemoveAllFiters,
    handleSort,
    order,
    setOrder,
    orderColumn,
    setOrderColumn,
  } = useContext(AppContext);
  return (
    <form>
      <div>
        <label htmlFor="search" className="search">
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Find a planet"
            value={ search }
            data-testid="name-filter"
            onChange={ (e) => setSearch(e.target.value) }
          />
          <MdSearch />
        </label>
      </div>
      <div className="filters">
        <label htmlFor="column" className="column">
          Column
          <select
            name="column"
            id="column"
            value={ column }
            onChange={ (e) => setColumn(e.target.value) }
            data-testid="column-filter"
          >
            {colOpt.sort((a, b) => a - b)
              .map((col) => <option key={ col } value={ col }>{col}</option>)}
          </select>
        </label>
        <label htmlFor="comparison">
          Operator
          <select
            name="comparison"
            id="comparison"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">Greater than</option>
            <option value="menor que">Less than</option>
            <option value="igual a">Equal to</option>
          </select>
        </label>
        <label htmlFor="amount">
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="amount"
            value={ amount }
            className="amount"
            data-testid="value-filter"
            onChange={ (e) => setAmount(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleFilterButton({ column, comparison, amount }) }
          disabled={ colOpt.length === 0 }
        >
          Filter

        </button>
        <button
          type="button"
          onClick={ () => handleRemoveAllFiters() }
          data-testid="button-remove-filters"
        >
          Remove filters

        </button>
        <label htmlFor="column-order">
          Order
          <select
            name="column"
            id="column"
            value={ orderColumn }
            onChange={ (e) => setOrderColumn(e.target.value) }
            data-testid="column-sort"
          >
            {cols.map((col) => <option key={ col } value={ col }>{col}</option>)}
          </select>
        </label>
        <div className="radios">
          <label htmlFor="ASC">
            <input
              type="radio"
              name="order"
              id="ASC"
              value="ASC"
              checked={ order === 'ASC' }
              onChange={ ({ target }) => setOrder(target.value) }
              data-testid="column-sort-input-asc"
            />
            Ascending
          </label>
          <label htmlFor="DESC">
            <input
              type="radio"
              name="order"
              id="DESC"
              value="DESC"
              checked={ order === 'DESC' }
              onChange={ ({ target }) => setOrder(target.value) }
              data-testid="column-sort-input-desc"
            />
            Descending
          </label>
        </div>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSort({ order, column: orderColumn }) }
        >
          Sort
        </button>
      </div>
    </form>
  );
}

export default Filters;
