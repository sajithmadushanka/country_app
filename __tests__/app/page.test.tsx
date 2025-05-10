import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'
import { fetchAllCountries } from '@/services/countries'

// Mock the countries service
jest.mock('@/services/countries', () => ({
  fetchAllCountries: jest.fn()
}))

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', async () => {
    // Mock fetchAllCountries to return a promise that never resolves
    ;(fetchAllCountries as jest.Mock).mockImplementation(() => new Promise(() => {}))
    
    render(<HomePage />)
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument()
  })

  it('renders countries after loading', async () => {
    const mockCountries = [
      {
        name: { common: 'Test Country' },
        capital: ['Test Capital'],
        population: 1000000,
        region: 'Test Region',
        cca3: 'TST',
        flags: {
          png: 'https://flagcdn.com/test.png',
        },
      },
    ]

    ;(fetchAllCountries as jest.Mock).mockResolvedValueOnce(mockCountries)

    render(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument()
    })
  })

  it('renders error state when fetch fails', async () => {
    ;(fetchAllCountries as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load countries.')).toBeInTheDocument()
    })
  })
}) 