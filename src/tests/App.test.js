import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppContext from '../context/AppContext';
import AppProvider from '../context/AppProvider';
import mockData from '../helpers/mocks/mockData';
import mockFetch from '../helpers/mocks/mockFetch';

jest.setTimeout(50000);

describe("test app", () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    // json: jest.fn().mockResolvedValue(mockData),
    // });
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Testing if the API is called properly', () => {
 
    const value = {filters: [], filterData: mockData, search: '', colOpt: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ], fetchPlanets: jest.fn(), amount: 0,}
    
    render(
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
    );
    expect(value.fetchPlanets).toHaveBeenCalled();
    expect(value.fetchPlanets).toHaveBeenCalledTimes(1);
    expect(value.fetchPlanets).toHaveBeenCalledWith("https://swapi-trybe.herokuapp.com/api/planets/");
  });
  it('Testing if render correctly', async () => {
    const optionsArr = [ 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water', 'maior que', 'menor que', 'igual a', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const ths = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];
    const value = {filters: [], filterData: mockData, search: '', colOpt: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ], fetchPlanets: jest.fn(), amount: 0,}
    const arr = mockData;
    arr.map((data) => delete data.residents);
    const newArr = arr.map((el) => Object.values(el).flat().join('') );
    newArr.unshift('NameRotation PeriodOrbital PeriodDiameterClimateGravityTerrainSurface WaterPopulationFilmsCreatedEditedURL');
    render(
    <AppContext.Provider value={value}>
      <App />
    </AppContext.Provider>
    );
    const search = screen.getByTestId('name-filter');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('name', 'search');
    expect(search).toHaveAttribute('type', 'text');
    const column = screen.getByTestId('column-filter');
    expect(column).toBeInTheDocument();
    expect(column).toHaveAttribute('name', 'column');
    const comparison = screen.getByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();
    expect(comparison).toHaveAttribute('name', 'comparison');
    const comboBox = screen.getAllByRole('combobox');
    expect(comboBox).toHaveLength(3);
    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveAttribute('name', 'amount');
    expect(valueInput).toHaveAttribute('type', 'number');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(13);
    options.forEach((option, index) => {
      expect(option).toBeInTheDocument();
      expect(option).toHaveTextContent(optionsArr[index]);
    });
    const btn = screen.getByRole('button', {name: "Filter"});
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Filter');
    expect(btn).toHaveAttribute('data-testid', 'button-filter')
    const row = screen.getAllByRole('row');
    row.forEach((rowEl, index) => {
      expect(rowEl).toBeInTheDocument();
      expect(rowEl).toHaveTextContent(newArr[index]);
    })
    const columns = screen.getAllByRole('columnheader');
    columns.forEach((column, index) => {
      expect(column).toBeInTheDocument();
      expect(column).toHaveTextContent(ths[index]);
    });
    // const algo = await screen.findByRole('i');
  });
  it('Testing provider', async () => {
    const optionsArr = [ 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water', 'maior que', 'menor que', 'igual a', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    render(
    <AppProvider>
      <App />
    </AppProvider>
    );
    const search = await screen.findByTestId('name-filter');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('name', 'search');
    expect(search).toHaveAttribute('type', 'text');
    const column = await screen.findByTestId('column-filter');
    expect(column).toBeInTheDocument();
    expect(column).toHaveAttribute('name', 'column');
    const comparison = await screen.findByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();
    expect(comparison).toHaveAttribute('name', 'comparison');
    const comboBox = await screen.findAllByRole('combobox');
    expect(comboBox).toHaveLength(3);
    const valueInput = await screen.findByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveAttribute('name', 'amount');
    expect(valueInput).toHaveAttribute('type', 'number');
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(13);
    options.forEach((option, index) => {
      expect(option).toBeInTheDocument();
      expect(option).toHaveTextContent(optionsArr[index]);
    });
    const btn = await screen.findByRole('button', {name: "Filter"});
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Filter');
    expect(btn).toHaveAttribute('data-testid', 'button-filter');
    const row = await screen.findAllByRole('row')
  });
  // it('Testing  ', async () => {
 
  //   // const value = {filters: [], filterData: mockData, search: '', colOpt: [
  //   //   'population',
  //   //   'orbital_period',
  //   //   'diameter',
  //   //   'rotation_period',
  //   //   'surface_water',
  //   // ], fetchPlanets: jest.fn(), amount: 0,}
  //   // await act( async () => renderHook(() => ) )
  //   render(<AppProvider><App /></AppProvider> );
  //   const algo = await screen.findByRole('i');
  // });
  it('Testing if buttons work properly', async () => {
    // const value = {filters: [], filterData: mockData, search: '', colOpt: [
    //   'population',
    //   'orbital_period',
    //   'diameter',
    //   'rotation_period',
    //   'surface_water',
    // ], fetchPlanets: jest.fn(), amount: 0,}
     jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
    });
    render(
    <AppProvider>
      <App />
    </AppProvider>
    );
    // await new Promise((r) => setTimeout(r, 40000))
    const search = await screen.findByTestId('name-filter');
    userEvent.type(search, 'tat');
    expect(search).toHaveDisplayValue('tat');
    const btn = await screen.findByRole('button', {name: "Filter"});
    userEvent.click(btn);
    const filterText = await screen.findByText('population maior que 0')
    expect(filterText).toBeInTheDocument();
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(12);
    expect(options[0]).not.toHaveTextContent('population');
    const column = await screen.findByTestId('column-filter');
    expect(column).toHaveDisplayValue('orbital_period')
    const xBtn = await screen.findByRole('button', {name: 'X'});
    userEvent.click(xBtn);
    expect(filterText).not.toBeInTheDocument();
    const newOptions = await screen.findAllByRole('option');
    expect(newOptions).toHaveLength(13);
    expect(newOptions[4]).toHaveTextContent('population');
    const comparison = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    const newOptions2 = await screen.findAllByRole('option');
    expect(newOptions2).toHaveLength(8);
    expect(newOptions2[0]).toHaveTextContent('maior que');
    const newColumn = await screen.findByTestId('column-filter');
    expect(newColumn).toHaveDisplayValue([])
    const filterText1 = await screen.findByText('population maior que 0')
    expect(filterText1).toBeInTheDocument();
    const filterText2 = await screen.findByText('orbital_period menor que 0')
    expect(filterText2).toBeInTheDocument();
    const filterText3 = await screen.findByText('diameter igual a 0')
    expect(filterText3).toBeInTheDocument();
    const filterText4 = await screen.findByText('rotation_period maior que 0')
    expect(filterText4).toBeInTheDocument();
    const filterText5 = await screen.findByText('surface_water maior que 0')
    expect(filterText5).toBeInTheDocument();
    const rmvFiltersBtn = await screen.findByRole('button', {name: 'Remove filters'})
    userEvent.click(rmvFiltersBtn);
    expect(filterText1).not.toBeInTheDocument();
    expect(filterText2).not.toBeInTheDocument();
    expect(filterText3).not.toBeInTheDocument();
    expect(filterText4).not.toBeInTheDocument();
    expect(filterText5).not.toBeInTheDocument();
    const newOptions3 = await screen.findAllByRole('option');
    expect(newOptions3).toHaveLength(13);
    expect(newOptions3[0]).toHaveTextContent('population');
    const ascRadio = await screen.findByTestId('column-sort-input-asc');
    const descRadio = await screen.findByTestId('column-sort-input-desc');
    expect(ascRadio).toBeInTheDocument();
    expect(descRadio).toBeInTheDocument();
    userEvent.click(ascRadio)
    expect(ascRadio).toBeChecked();
    const sortBtn = await screen.findByRole('button', {name: 'Sort'});
    userEvent.click(sortBtn);
    userEvent.click(descRadio);
    expect(descRadio).toBeChecked();
    expect(ascRadio).not.toBeChecked();
    userEvent.click(sortBtn);
    // const algo = await screen.findByRole('i');
  });
})
