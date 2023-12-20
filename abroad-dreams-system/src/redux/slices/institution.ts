// Redux >> slices >> institution.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { InstitutionState, Institution } from "../../types/institution";
import { AppDispatch } from "../store";

const initialState: InstitutionState = {
    error: null,
    institutions: [
        {
            id: "1",
            name: "University of Coventry",
            countryId: "1", // Update with a valid country ID
            // Add any other fields you need for the institution
        },
    ],
    selectedInstitution: undefined,

};

const slice = createSlice({
    name: "institution",
    initialState,
    reducers: {
        hasError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        selectInstitutionSuccess(state, action) {
            const index = state.institutions.findIndex(
                (item) => item.id === action.payload
            );
            state.selectedInstitution = state.institutions[index];
        },

        updateInstitutionSuccess(state, action) {
            const updateIndex = state.institutions.findIndex(
                (item) => item.id === action.payload.id
            );
            state.institutions = state.institutions.map((institution, index) =>
                updateIndex === index
                    ? { ...action.payload.updatedInstitution, id: institution.id }
                    : institution
            );
        },

        deleteInstitutionSuccess(state, action: PayloadAction<string>) {
            state.institutions = state.institutions.filter((institution) => institution.id !== action.payload);
            state.selectedInstitution = undefined;
        },

        createInstitutionSuccess(state, action: PayloadAction<Institution>) {
            const newInstitution = { ...action.payload, id: uuidv4() };
            state.institutions = [...state.institutions, newInstitution];
        },

        clearInstitution(state) {
            state.selectedInstitution = undefined;
        },

        clearInstitutions(state) {
            state.institutions = [];
        },

        clearHasError(state) {
            state.error = null;
        },
    },
});

export const {
    hasError,
    selectInstitutionSuccess,
    deleteInstitutionSuccess,
    createInstitutionSuccess,
    updateInstitutionSuccess,
    clearInstitution,
    clearInstitutions,
    clearHasError,
} = slice.actions;

export const selectInstitution = (id: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(selectInstitutionSuccess(id));
    } catch (error) {
        dispatch(hasError(null));
        throw error;
    }
};


type CreateInstitutionProps = {
    name: string;
    countryId: string;
    // Add any other fields you need for the institution
};

export const createInstitution = (institution: CreateInstitutionProps) => (
    dispatch: AppDispatch
) => {
    try {
        const newInstitution: Institution = { ...institution, id: uuidv4() };
        dispatch(createInstitutionSuccess(newInstitution));
        // Assuming you want to reset the form or do other synchronous tasks
        // You can dispatch other actions here if needed
    } catch (error) {
        dispatch(hasError("error"));
        // Assuming you want to throw an error or handle it in some way
        // You can throw the error if needed
        throw error;
    }
};

type FormValuesProps = {
    name: string;
    // Add any other fields you need for the institution
};

type UpdateInstitutionPayload = {
    id: string;
    updatedInstitution: FormValuesProps & { countryId: string }; // Update with the new field
};

export const updateInstitution = (payload: UpdateInstitutionPayload) => (
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateInstitutionSuccess(payload));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};


export const deleteInstitution = (id: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(deleteInstitutionSuccess(id));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

export default slice.reducer;
