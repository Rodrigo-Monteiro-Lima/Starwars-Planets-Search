import mockData from './mockData';

const mockFetch = () => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockData),
});

export default mockFetch;
