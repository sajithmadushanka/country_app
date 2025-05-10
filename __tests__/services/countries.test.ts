import { fetchAllCountries } from '@/services/countries'

describe('Countries Service', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetches all countries successfully', async () => {
    const mockCountries = [
      {
        name: { common: 'Test Country' },
        capital: ['Test Capital'],
        population: 1000000,
        region: 'Test Region',
        cca3: 'TST',
        flags: {
          png: 'https://flagcdn.com/test.png',
          alt: undefined
        },
        nativeName: 'Test Country',
        subregion: undefined,
        area: undefined,
        gini: 'N',
        topLevelDomain: [],
        currencies: [],
        languages: [],
        borders: []
      }
    ]

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCountries)
    })

    const result = await fetchAllCountries()
    expect(result).toEqual(mockCountries)
    expect(global.fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all')
  })

  it('handles fetch error', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch countries'))

    await expect(fetchAllCountries()).rejects.toThrow('Failed to fetch countries')
  })
}) 