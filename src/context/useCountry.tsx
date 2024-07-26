import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Country } from "@/shared/model/common";

interface IContext {
  countries: Country[] | undefined | Country;
}

const CountryContext = createContext<IContext>({ countries: [] });

const API_URL = process.env.NEXT_PUBLIC_API;

export const useCountry = (): Country[] | undefined | Country => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry error");
  }
  return context.countries;
};

export const CountryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region")?.toLowerCase();

  const [countries, setCountries] = useState<Country[] | undefined | Country>(
    undefined
  );

  let queryParam: string;
  switch (true) {
    case !!selectedRegion:
      queryParam = `/region/${selectedRegion}`;
      break;
    default:
      queryParam = "/all";
  }

  // country?.name.nativeName[native].official
  const formatResponse = async (data: Country[]) => {
    const formattedData: Country[] = data.map((country: any) => {
      const value = {
        name: country.name.official,
        population: country.population,
        region: country.region,
        flags: country.flags.png,
        capital: country.capital,
        cca2: country.cca2,
        cca3: country.cca3,
      };

      return value;
    });
    return formattedData;
  };

  // Flags (Please use png file within flags property)
  //       - Country Name (name.official)
  //       - 2 character Country Code (cca2)
  //       - 3 character Country Code (cca3)
  //       - Native Country Name (name.nativeName)
  //       - Alternative Country Name (altSpellings)
  //       - Country Calling Codes (idd)

  useEffect(() => {
    const getCountries = async () => {
      try {
        const resp = await fetch(`${API_URL}/v3.1${queryParam}`);
        if (resp.ok) {
          const data = await resp.json();
          const responseFormatted = await formatResponse(data);

          console.log(responseFormatted);
          setCountries(responseFormatted);
        } else {
          console.error("Error formatting data", resp.status);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  return (
    <CountryContext.Provider value={{ countries }}>
      {children}
    </CountryContext.Provider>
  );
};
