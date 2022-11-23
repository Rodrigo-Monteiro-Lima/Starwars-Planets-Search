import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import AppContext from './context/AppContext';
import Filters from './components/FIlters';

function App() {
  const { fetchPlanets } = useContext(AppContext);
  useEffect(() => {
    fetchPlanets('https://swapi-trybe.herokuapp.com/api/planets/');
  }, []);
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://swapi-trybe.herokuapp.com/api/planets/')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData(result.results);
  //       setFilterData(result.results);
  //     })
  //     .catch((e) => setErrors(e))
  //     .then(() => setIsLoading(false));
  // }, []);
  return (
    <div>
      <Filters />
      <Table />
    </div>
  );
}

export default App;
