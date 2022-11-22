import React, { useContext, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import AppContext from './context/AppContext';

function App() {
  const { fetchPlanets } = useContext(AppContext);
  useEffect(() => {
    fetchPlanets('https://swapi-trybe.herokuapp.com/api/planets/');
  }, []);
  return (
    <div><Table /></div>
  );
}

export default App;
