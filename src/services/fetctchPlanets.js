import { useContext } from 'react';
import AppContext from '../context/AppContext';

const fetchPlanets = async (url) => {
  const { setIsLoading, setFilterData, setData, setErrors } = useContext(AppContext);
  try {
    setIsLoading(true);
    const response = await fetch(url);
    if (!response.ok) {
      const newError = await response.json();
      throw newError.message;
    }
    const results = await response.json();
    setData(results.results);
    setFilterData(results.results);
  } catch (e) {
    setErrors(e);
  } finally {
    setIsLoading(false);
  }
};
