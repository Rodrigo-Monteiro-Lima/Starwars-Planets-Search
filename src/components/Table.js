import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import './Table.css';

function Table() {
  const {
    filterData,
    isLoading,
    search,
  } = useContext(AppContext);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="table-container">
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
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {/* <div style={ { display: 'flex', gap: '2px' } }>
                    {planet.films.map((film) => (
                      <div key={ film }>{`${film.split('/')[5]} º`}</div>
                    ))}
                  </div> */}
                  {planet.films.map((film) => film.split('/')[5].concat('º')).join(', ')}
                </td>
                <td>
                  {
                    `${planet.created.split('.')[0].split('T')[0].split('-').reverse()
                      .join('/')} at ${planet.created.split('.')[0].split('T')[1]}`
                  }
                </td>
                <td>
                  {
                    `${planet.edited.split('.')[0].split('T')[0].split('-').reverse()
                      .join('/')} at ${planet.edited.split('.')[0].split('T')[1]}`
                  }
                </td>
                <td><a href={ planet.url } target="_blank" rel="noreferrer">Link</a></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
