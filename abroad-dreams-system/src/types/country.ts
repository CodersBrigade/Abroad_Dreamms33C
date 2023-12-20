export type Country = {
    id: string;
    name: string;
    shortname: string;
    // Add any other fields you need for the country
};

export type CountryState = {
    error: Error | string | null;
    countries: Country[];
    selectedCountry: Country | undefined;
};
