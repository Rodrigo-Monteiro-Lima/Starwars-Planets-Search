import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState(0);
  const [comparison, setComparison] = useState('maior que');
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [column, setColumn] = useState('population');

  const fetchPlanets = async (url) => {
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

  const values = useMemo(() => ({
    data,
    isLoading,
    errors,
    search,
    column,
    amount,
    comparison,
    filterData,
    fetchPlanets,
    setAmount,
    setColumn,
    setComparison,
    setSearch,
  }), [data, isLoading, errors, search, column, comparison, amount, filterData]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
