export interface Country {
  name: string;
  population: number;
  region: string;
  flags: string;
  capital: string[];
  native?: string;
  subregion?: string;
  tld?: string;
  currencies?: string[];
  languages?: Object;
  borders?: string[];
  nativeLang?: string | any;
  cca2: string;
  cca3: string;
  altSpellings?: string;
  idd: string;
}

export interface CountryDetails {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: string[];
  idd: string;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    eng: string;
  };

  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
}
