import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { CountryState, Country } from "../../types/country";
import { AppDispatch } from "../store";

const initialState: CountryState = {
    error: null,
    countries: [
        {
            id: "1",
            name: "United Kingdom",
            shortname: "UK",
            // Add any other fields you need for the country
        },
    ],
    selectedCountry: undefined,
};

const slice = createSlice({
    name: "country",
    initialState,
    reducers: {
        hasError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        selectCountrySuccess(state, action) {
            const index = state.countries.findIndex(
                (item) => item.id === action.payload
            );
            state.selectedCountry = state.countries[index];
        },

        updateCountrySuccess(state, action) {
            const updateIndex = state.countries.findIndex(
                (item) => item.id === action.payload.id
            );
            state.countries = state.countries.map((country, index) =>
                updateIndex === index
                    ? { ...action.payload.updatedCountry, id: country.id }
                    : country
            );
        },


        deleteCountrySuccess(state, action: PayloadAction<string>) {
            state.countries = state.countries.filter((country) => country.id !== action.payload);
            state.selectedCountry = undefined;
        },

        createCountrySuccess(state, action: PayloadAction<Country>) {
            const newCountry = { ...action.payload, id: uuidv4() };
            state.countries = [...state.countries, newCountry];
        },


        clearCountry(state) {
            state.selectedCountry = undefined;
        },

        clearCountries(state) {
            state.countries = [];
        },

        clearHasError(state) {
            state.error = null;
        },
    },
});

export const {
    hasError,
    selectCountrySuccess,
    deleteCountrySuccess,
    createCountrySuccess,
    updateCountrySuccess,
    clearCountry,
    clearCountries,
    clearHasError,
} = slice.actions;

export const selectCountry = (id: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(selectCountrySuccess(id));
    } catch (error) {
        dispatch(hasError(null));
        throw error;
    }
};

type CreateCountryProps = {
    name: string;
    shortname: string;
    // Add any other fields you need for the country
};

export const createCountry = (country: CreateCountryProps) => (dispatch: AppDispatch) => {
    try {
        const newCountry: Country = { ...country, id: uuidv4() };
        dispatch(createCountrySuccess(newCountry));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};
type FormValuesProps = {
    name: string;
    shortname: string;
    // Add any other fields you need for the country
};
export const updateCountry = (payload: { id: string; updatedCountry: FormValuesProps }) => (
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateCountrySuccess(payload));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};


export const deleteCountry = (id: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(deleteCountrySuccess(id));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

export default slice.reducer;
