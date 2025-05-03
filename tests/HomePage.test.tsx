import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from "@/app/page";
import { Country } from "@/types/country";

// Mock fetchAllCountries
jest.mock("@/services/countries", () => ({
  fetchAllCountries: jest.fn(),
}));

import { fetchAllCountries } from "@/services/countries";

const mockCountries: Country[] = [
  {
    name: "Canada",
    capital: "Ottawa",
    population: 37742154,
    region: "Americas",
    area: 9984670,
    flags: { png: "https://flagcdn.com/ca.png" },
    cca3: "CAN",
    gini: { "2018": 33.3 },
  },
  {
    name: "Germany",
    capital: "Berlin",
    population: 83783942,
    region: "Europe",
    area: 357022,
    flags: { png: "https://flagcdn.com/de.png" },
    cca3: "DEU",
    gini: { "2019": 31.9 },
  },
];

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    });
  
  });

  it("renders loading state and then countries", async () => {
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);
    render(<HomePage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Canada/)).toBeInTheDocument();
      expect(screen.getByText(/Germany/)).toBeInTheDocument();
    });
  });

  it("shows error when fetch fails", async () => {
    (fetchAllCountries as jest.Mock).mockRejectedValue(new Error("API failed"));
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load countries/i)).toBeInTheDocument();
    });
  });

  it("filters by search", async () => {
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "germ" } });

    await waitFor(() => {
      expect(screen.queryByText("Canada")).not.toBeInTheDocument();
        expect(screen.getByText("Germany")).toBeInTheDocument();
    }
    );
  }
  );
  it("filters by region", async () => {
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });

    const regionSelect = screen.getByRole("combobox");
    fireEvent.change(regionSelect, { target: { value: "Europe" } });

    await waitFor(() => {
      expect(screen.queryByText("Canada")).not.toBeInTheDocument();
      expect(screen.getByText("Germany")).toBeInTheDocument();
    });
  });