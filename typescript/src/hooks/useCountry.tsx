import { createContext, useContext, useState } from "react";

export type Country = "mexico" | "new-zealand" | "sweden" | "thailand";
type CountryContextProps = {
  country: Country;
  handleCountry: (country: Country) => void;
};

const CountryContext = createContext<CountryContextProps>({
  country: "mexico",
  handleCountry: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useCountry = () => useContext(CountryContext);

export type CountryProviderProps = {
  children: React.ReactNode;
  value?: Country;
};

export default function CountryProvider({
  children,
  value,
}: CountryProviderProps) {
  const [country, setCountry] = useState<Country>(value || "mexico");

  const handleCountry = (country: Country) => setCountry(country);

  return (
    <CountryContext.Provider value={{ country, handleCountry }}>
      {children}
    </CountryContext.Provider>
  );
}
