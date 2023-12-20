// redux/slices/classroom.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ClassroomState, Classroom } from "../../types/classroom";
import { AppDispatch } from "../store";

const initialState: ClassroomState = {
    error: null,
    classrooms: [
        {
            id: "1",
            name: "Classroom 101",
            capacity: 30,
            dateAvailability: "2023-01-01",
            // Add any other fields you need for the classroom
        },
    ],
    selectedClassroom: undefined,
};

const slice = createSlice({
    name: "classroom",
    initialState,
    reducers: {
        hasError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        selectClassroomSuccess(state, action) {
            const index = state.classrooms.findIndex(
                (item) => item.id === action.payload
            );
            state.selectedClassroom = state.classrooms[index];
        },

        updateClassroomSuccess(state, action) {
            const updateIndex = state.classrooms.findIndex(
                (item) => item.id === action.payload.id
            );
            state.classrooms = state.classrooms.map((classroom, index) =>
                updateIndex === index
                    ? { ...action.payload.updatedClassroom, id: classroom.id }
                    : classroom
            );
        },

        deleteClassroomSuccess(state, action: PayloadAction<string>) {
            state.classrooms = state.classrooms.filter((classroom) => classroom.id !== action.payload);
            state.selectedClassroom = undefined;
        },

        createClassroomSuccess(state, action: PayloadAction<Classroom>) {
            const newClassroom = { ...action.payload, id: uuidv4() };
            state.classrooms = [...state.classrooms, newClassroom];
        },

        clearClassroom(state) {
            state.selectedClassroom = undefined;
        },

        clearClassrooms(state) {
            state.classrooms = [];
        },

        clearHasError(state) {
            state.error = null;
        },
    },
});

export const {
    hasError,
    selectClassroomSuccess,
    deleteClassroomSuccess,
    createClassroomSuccess,
    updateClassroomSuccess,
    clearClassroom,
    clearClassrooms,
    clearHasError,
} = slice.actions;

export const selectClassroom = (id: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(selectClassroomSuccess(id));
    } catch (error) {
        dispatch(hasError(null));
        throw error;
    }
};

type CreateClassroomProps = {
    name: string;
    capacity: number;
    dateAvailability: string;
    // Add any other fields you need for the classroom
};

export const createClassroom = (classroom: CreateClassroomProps) => (dispatch: AppDispatch) => {
    try {
        const newClassroom: Classroom = { ...classroom, id: uuidv4() };
        dispatch(createClassroomSuccess(newClassroom));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

type FormValuesProps = {
    name: string;
    capacity: number;
    dateAvailability: string;
    // Add any other fields you need for the classroom
};
export const updateClassroom = (payload: { id: string; updatedClassroom: FormValuesProps }) => (
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateClassroomSuccess(payload));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

export const deleteClassroom = (id: string) => (dispatch: AppDispatch) => {
    try {
        dispatch(deleteClassroomSuccess(id));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

export default slice.reducer;
