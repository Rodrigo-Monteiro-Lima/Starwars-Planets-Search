import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState(0);
  const [filters, setFilters] = useState([]);
  const [comparison, setComparison] = useState('maior que');
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectedCol, setSelectedCol] = useState([]);
  const [colOpt, setColOpt] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [column, setColumn] = useState('population');

  const handleOpt = (arr) => {
    const newCols = arr.reduce((acc, curr) => {
      const cols = acc.filter((el) => el !== curr);
      return cols;
    }, colOpt);
    setColOpt(newCols);
    setColumn(newCols[0]);
  };

  const handleFilterButton = (obj) => {
    const arrayFilter = [...filters, obj];
    const cols = [...selectedCol, obj.column];
    handleOpt(cols);
    if (obj.comparison === 'maior que') {
      setFilterData(filterData
        .filter((planet) => (+planet[obj.column]) > (+obj.amount)));
    }
    if (obj.comparison === 'menor que') {
      setFilterData(filterData.filter((planet) => (+planet[obj.column]) < (+obj.amount)));
    }
    if (obj.comparison === 'igual a') {
      setFilterData(filterData
        .filter((planet) => (+planet[obj.column]) === (+obj.amount)));
    }
    setFilters(arrayFilter);
    setSelectedCol(cols);
    setAmount(0);
    setComparison('maior que');
  };

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
    filters,
    selectedCol,
    colOpt,
    fetchPlanets,
    setAmount,
    setColumn,
    setComparison,
    setSearch,
    handleFilterButton,
    setColOpt,
  }), [
    data,
    isLoading,
    errors,
    search,
    column,
    comparison,
    amount,
    filterData,
    filters,
    selectedCol,
    colOpt,
  ]);

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
