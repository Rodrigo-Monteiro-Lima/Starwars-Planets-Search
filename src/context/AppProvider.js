import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  // const [sort, setSort] = useState(false);
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
  const [order, setOrder] = useState();
  const [orderColumn, setOrderColumn] = useState('population');

  const handleSort = (obj) => {
    // setSort(true);
    const noUnknown = filterData.filter((planet) => planet[obj.column] !== 'unknown');
    const unknown = filterData.filter((planet) => planet[obj.column] === 'unknown');
    if (obj.order === 'ASC') {
      const sorted = noUnknown
        .sort((a, b) => Number(a[obj.column]) - Number(b[obj.column]));
      setFilterData([...sorted, ...unknown]);
    } else {
      const sorted = noUnknown
        .sort((a, b) => Number(b[obj.column]) - Number(a[obj.column]));
      setFilterData([...sorted, ...unknown]);
    }
  };

  const handleRemoveFilter = (col) => {
    const newFilters = filters.filter((fil) => fil.column !== col);
    setFilters(newFilters);
    const newCols = [...colOpt, col];
    setSelectedCol(selectedCol.filter((el) => el !== col));
    setColOpt(newCols);
    setColumn(newCols[0]);
    if (newFilters.length === 0) {
      setFilterData(data);
    } else {
      newFilters.forEach((filt) => {
        if (filt.comparison === 'maior que') {
          setFilterData(data
            .filter((planet) => (+planet[filt.column]) > (+filt.amount)));
        }
        if (filt.comparison === 'menor que') {
          setFilterData(data.filter((planet) => (+planet[filt.column]) < (+filt.amount)));
        }
        if (filt.comparison === 'igual a') {
          setFilterData(data
            .filter((planet) => (+planet[filt.column]) === (+filt.amount)));
        }
      });
    }
    // if (sort) {
    //   const ord = order;
    //   handleSort({ order: ord, column: orderColumn });
    // }
  };

  const handleRemoveAllFiters = () => {
    // setSort(false);
    setFilters([]);
    setColOpt([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setFilterData(data);
    setSelectedCol([]);
    setColumn('populations');
  };

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
    order,
    orderColumn,
    setOrderColumn,
    handleSort,
    setOrder,
    setAmount,
    setColumn,
    setComparison,
    setSearch,
    handleFilterButton,
    handleRemoveAllFiters,
    handleRemoveFilter,
    fetchPlanets,
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
    order,
    orderColumn,
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
