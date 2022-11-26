import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppContext from '../context/AppContext';
// import { act } from 'react-dom/test-utils';
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
    render(
    <AppProvider>
      <App />
    </AppProvider>
    );
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://swapi-trybe.herokuapp.com/api/planets/");
  });
  it('Testing if render correctly', async () => {
    const optionsArr = [ 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water', 'maior que', 'menor que', 'igual a', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const ths = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];
    const arr = mockData.results;
    arr.map((data) => delete data.residents);
    const newArr = arr.map((el) => Object.values(el).flat().join('') );
    newArr.unshift('NameRotation PeriodOrbital PeriodDiameterClimateGravityTerrainSurface WaterPopulationFilmsCreatedEditedURL');
    render(
    <AppProvider>
      <App />
    </AppProvider>
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
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(13);
    options.forEach((option, index) => {
      expect(option).toBeInTheDocument();
      expect(option).toHaveTextContent(optionsArr[index]);
    });
    const btn = screen.getByRole('button', {name: "Filter"});
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Filter');
    expect(btn).toHaveAttribute('data-testid', 'button-filter')
    const row = await screen.findAllByRole('row');
    row.forEach((rowEl, index) => {
      expect(rowEl).toBeInTheDocument();
      expect(rowEl).toHaveTextContent(newArr[index]);
    })
    const columns = screen.getAllByRole('columnheader');
    columns.forEach((column, index) => {
      expect(column).toBeInTheDocument();
      expect(column).toHaveTextContent(ths[index]);
    });
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
  });
  it('Testing if filters work properly', async () => {
    const planets = ['Tatooine', 'Naboo', 'Kamino', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor',  'Coruscant'];
      render(
      <AppProvider>
        <App />
      </AppProvider>
      );
    const search = await screen.findByTestId('name-filter');
    userEvent.type(search, 'oo');
    expect(search).toHaveDisplayValue('oo');
    const tatooine = await screen.findByText('Tatooine');
    expect(tatooine).toBeInTheDocument()
    const naboo = await screen.findByText('Naboo');
    expect(naboo).toBeInTheDocument();
    planets.filter((planet) => !planet.includes('oo')).forEach((planet) => {
      expect(screen.queryByText(planet)).not.toBeInTheDocument();
    });
    userEvent.clear(search);
    planets.forEach((planet) => {
      expect(screen.queryByText(planet)).toBeInTheDocument();
    })
    const btn = await screen.findByRole('button', {name: "Filter"});
    userEvent.click(btn);
    const filterText = await screen.findByText('population maior que 0')
    expect(filterText).toBeInTheDocument();
    const hoth = screen.queryByText('Hoth');
    expect(hoth).not.toBeInTheDocument();
    const dagobah = screen.queryByText('Dagobah');
    expect(dagobah).not.toBeInTheDocument();
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(12);
    expect(options[0]).not.toHaveTextContent('population');
    const column = await screen.findByTestId('column-filter');
    expect(column).toHaveDisplayValue('orbital_period')
    const xBtn = await screen.findByRole('button', {name: 'X'});
    userEvent.click(xBtn);
    expect(screen.queryByText('Hoth')).toBeInTheDocument();
    expect(screen.queryByText('Dagobah')).toBeInTheDocument();
    expect(filterText).not.toBeInTheDocument();
    const newOptions = await screen.findAllByRole('option');
    expect(newOptions).toHaveLength(13);
    expect(newOptions[4]).toHaveTextContent('population');
    const comparison = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparison, 'menor que');
    const valueInput = await screen.findByTestId('value-filter');
    userEvent.selectOptions(column, 'diameter')
    userEvent.type(valueInput, '9000');
    userEvent.click(btn);
    const filterText2 = await screen.findByText('diameter menor que 09000')
    expect(screen.getByText('Hoth')).toBeInTheDocument();
    expect(screen.getByText('Dagobah')).toBeInTheDocument();
    expect(screen.getByText('Endor')).toBeInTheDocument();
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '304');
    // expect(screen.getByText('Tatooine')).toBeInTheDocument();
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
    expect(filterText2).toBeInTheDocument();
    const filterText3 = await screen.findByText('diameter menor que 09000')
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
    const order = await screen.findByTestId('column-sort');
    userEvent.selectOptions(order, 'diameter')
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
  });
  it("Testing select options", async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
      );
    const comparison = await screen.findByTestId('comparison-filter');
    const btn = await screen.findByRole('button', {name: "Filter"});
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    const xBtns =  await screen.findAllByRole('button', {name: 'X'});
    expect(xBtns).toHaveLength(5);
    xBtns.forEach((xbtn) => {
      userEvent.click(xbtn);
    })
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.click(btn);
    const xBtns2 =  await screen.findAllByRole('button', {name: 'X'});
    expect(xBtns2).toHaveLength(5);
    xBtns2.forEach((xbtn) => {
      userEvent.click(xbtn);
    })
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.click(btn);
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.click(btn);
    const xBtns3 =  await screen.findAllByRole('button', {name: 'X'});
    expect(xBtns3).toHaveLength(5);
    xBtns3.forEach((xbtn) => {
      userEvent.click(xbtn);
    })
  });
})
