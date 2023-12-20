export type Institution = {
    id: string;
    name: string;
    countryId: string; // Add the countryId field
    // Add any other fields you need for the institution
};

export type InstitutionState = {
    error: Error | string | null;
    institutions: Institution[];
    selectedInstitution: Institution | undefined;
};
