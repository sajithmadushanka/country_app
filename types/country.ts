export interface Country {
    name: {
      common: string;
    };
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    flags: { 
      png: string;
      alt?: string;
    };
    cca3: string;
    area: number;
    gini: string;
    topLevelDomain: string[];
    currencies: Array<{ name: string }>;
    languages: Array<{ name: string }>;
    borders: string[];
  }
  
 