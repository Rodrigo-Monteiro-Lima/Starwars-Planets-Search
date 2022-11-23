import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const {
    filterData,
    isLoading,
    search,
    filters,
    handleRemoveFilter,
  } = useContext(AppContext);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {filters.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          <p>{`${filter.column} ${filter.comparison} ${filter.amount}`}</p>
          <button
            type="button"
            onClick={ () => handleRemoveFilter(filter.column) }
          >
            X

          </button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterData.filter((plan) => plan.name.toLowerCase()
            .includes(search.toLowerCase()))
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {planet.films.map((film) => (
                    <div key={ film }>{film}</div>
                  ))}
                </td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
