import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppContext from '../context/AppContext';
import AppProvider from '../context/AppProvider';
import mockData from '../helpers/mocks/mockData';
import mockFetch from '../helpers/mocks/mockFetch';

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
  // it('Testing if the API is called properly', () => {
 
  //   const value = {filters: [], filterData: mockData, search: '', colOpt: [
  //     'population',
  //     'orbital_period',
  //     'diameter',
  //     'rotation_period',
  //     'surface_water',
  //   ], fetchPlanets: jest.fn(), amount: 0,}
    
  //   render(
  //   <AppContext.Provider value={value}>
  //     <App />
  //   </AppContext.Provider>
  //   );
  //   expect(value.fetchPlanets).toHaveBeenCalled();
  //   expect(value.fetchPlanets).toHaveBeenCalledTimes(1);
  //   expect(value.fetchPlanets).toHaveBeenCalledWith("https://swapi-trybe.herokuapp.com/api/planets/");
  // });
  // it('Testing if render correctly', async () => {
  //   const optionsArr = [ 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water', 'maior que', 'menor que', 'igual a', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  //   const ths = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];
  //   const value = {filters: [], filterData: mockData, search: '', colOpt: [
  //     'population',
  //     'orbital_period',
  //     'diameter',
  //     'rotation_period',
  //     'surface_water',
  //   ], fetchPlanets: jest.fn(), amount: 0,}
  //   const arr = mockData;
  //   arr.map((data) => delete data.residents);
  //   const newArr = arr.map((el) => Object.values(el).flat().join('') );
  //   newArr.unshift('NameRotation PeriodOrbital PeriodDiameterClimateGravityTerrainSurface WaterPopulationFilmsCreatedEditedURL');
  //   render(
  //   <AppContext.Provider value={value}>
  //     <App />
  //   </AppContext.Provider>
  //   );
  //   const search = screen.getByTestId('name-filter');
  //   expect(search).toBeInTheDocument();
  //   expect(search).toHaveAttribute('name', 'search');
  //   expect(search).toHaveAttribute('type', 'text');
  //   const column = screen.getByTestId('column-filter');
  //   expect(column).toBeInTheDocument();
  //   expect(column).toHaveAttribute('name', 'column');
  //   const comparison = screen.getByTestId('comparison-filter');
  //   expect(comparison).toBeInTheDocument();
  //   expect(comparison).toHaveAttribute('name', 'comparison');
  //   const comboBox = screen.getAllByRole('combobox');
  //   expect(comboBox).toHaveLength(3);
  //   const valueInput = screen.getByTestId('value-filter');
  //   expect(valueInput).toBeInTheDocument();
  //   expect(valueInput).toHaveAttribute('name', 'amount');
  //   expect(valueInput).toHaveAttribute('type', 'number');
  //   const options = screen.getAllByRole('option');
  //   expect(options).toHaveLength(13);
  //   options.forEach((option, index) => {
  //     expect(option).toBeInTheDocument();
  //     expect(option).toHaveTextContent(optionsArr[index]);
  //   });
  //   const btn = screen.getByRole('button', {name: "Filter"});
  //   expect(btn).toBeInTheDocument();
  //   expect(btn).toHaveTextContent('Filter');
  //   expect(btn).toHaveAttribute('data-testid', 'button-filter')
  //   const row = screen.getAllByRole('row');
  //   row.forEach((rowEl, index) => {
  //     expect(rowEl).toBeInTheDocument();
  //     expect(rowEl).toHaveTextContent(newArr[index]);
  //   })
  //   const columns = screen.getAllByRole('columnheader');
  //   columns.forEach((column, index) => {
  //     expect(column).toBeInTheDocument();
  //     expect(column).toHaveTextContent(ths[index]);
  //   });
  //   // const algo = await screen.findByRole('i');
  // });
  // it('Testing provider', async () => {
  //   const optionsArr = [ 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water', 'maior que', 'menor que', 'igual a', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  //   render(
  //   <AppProvider>
  //     <App />
  //   </AppProvider>
  //   );
  //   const search = await screen.findByTestId('name-filter');
  //   expect(search).toBeInTheDocument();
  //   expect(search).toHaveAttribute('name', 'search');
  //   expect(search).toHaveAttribute('type', 'text');
  //   const column = await screen.findByTestId('column-filter');
  //   expect(column).toBeInTheDocument();
  //   expect(column).toHaveAttribute('name', 'column');
  //   const comparison = await screen.findByTestId('comparison-filter');
  //   expect(comparison).toBeInTheDocument();
  //   expect(comparison).toHaveAttribute('name', 'comparison');
  //   const comboBox = await screen.findAllByRole('combobox');
  //   expect(comboBox).toHaveLength(3);
  //   const valueInput = await screen.findByTestId('value-filter');
  //   expect(valueInput).toBeInTheDocument();
  //   expect(valueInput).toHaveAttribute('name', 'amount');
  //   expect(valueInput).toHaveAttribute('type', 'number');
  //   const options = await screen.findAllByRole('option');
  //   expect(options).toHaveLength(13);
  //   options.forEach((option, index) => {
  //     expect(option).toBeInTheDocument();
  //     expect(option).toHaveTextContent(optionsArr[index]);
  //   });
  //   const btn = await screen.findByRole('button', {name: "Filter"});
  //   expect(btn).toBeInTheDocument();
  //   expect(btn).toHaveTextContent('Filter');
  //   expect(btn).toHaveAttribute('data-testid', 'button-filter');
  //   const row = await screen.findAllByRole('row')
  // });
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
  it('Testing', async () => {
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
    await new Promise((r) => setTimeout(r, 3000))
    const search = await screen.findByTestId('name-filter');
    userEvent.type(search, 'tat');
    expect(search).toHaveDisplayValue('tat');
    const btn = await screen.findByRole('button', {name: "Filter"});
    userEvent.click(btn);
    const algo = await screen.findByRole('i');
    expect()
  });
})
