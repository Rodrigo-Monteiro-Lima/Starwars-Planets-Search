import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

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
      <label htmlFor="column">
        <select
          name="column"
          id="column"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
          data-testid="column-filter"
        >
          {colOpt.map((col) => <option key={ col } value={ col }>{col}</option>)}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          name="comparison"
          id="comparison"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="amount">
        <input
          id="amount"
          type="number"
          name="amount"
          placeholder="amount"
          value={ amount }
          data-testid="value-filter"
          onChange={ (e) => setAmount(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterButton({ column, comparison, amount }) }
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
        {' '}
        Ascendente
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
        {' '}
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort({ order, column: orderColumn }) }
      >
        Sort
      </button>
    </form>
  );
}

export default Filters;
