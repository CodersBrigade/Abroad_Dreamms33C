// redux/slices/student.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "../../utils/idGenerator";
import { StudentState, Student } from "../../types/student";
import { AppDispatch } from "../store";

const initialState: StudentState = {
    error: null,
    students: [
        {
            id: 1, // Change to a number for the initial ID
            dateOfBirth: "1990-06-01",
            gender: "Male",
            address: "Maitidevi, Kathmandu",
            mobileNumber: "+977 9813457854",
            emailAddress: "hello@gmail.com",
            highSchoolDocument: "SEE_Certificate.pdf",
            languageProficiency: "iELTS (2022)",
            // Add any other fields you need for the student
        },
    ],
    selectedStudent: undefined,
};

const slice = createSlice({
    name: "student",
    initialState,
    reducers: {
        hasError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        selectStudentSuccess(state, action) {
            const index = state.students.findIndex(
                (item) => item.id === action.payload
            );
            state.selectedStudent = state.students[index];
        },

        updateStudentSuccess(state, action: PayloadAction<UpdateStudentPayload>) {
            const { id, updatedStudent } = action.payload;

            state.students = state.students.map((student) =>
                student.id === id ? { ...student, ...updatedStudent } : student
            );

            // If the selected student is being updated, update it as well
            if (state.selectedStudent && state.selectedStudent.id === id) {
                state.selectedStudent = { ...state.selectedStudent, ...updatedStudent };
            }
        },

        deleteStudentSuccess(state, action: PayloadAction<number>) { // Change payload type to number
            state.students = state.students.filter((student) => student.id !== action.payload);
            state.selectedStudent = undefined;
        },

        createStudentSuccess(state, action: PayloadAction<Student>) {
            const newStudent = { ...action.payload, id: generateId() };
            state.students = [...state.students, newStudent];
        },

        clearStudent(state) {
            state.selectedStudent = undefined;
        },

        clearStudents(state) {
            state.students = [];
        },

        clearHasError(state) {
            state.error = null;
        },
    },
});

export const {
    hasError,
    selectStudentSuccess,
    deleteStudentSuccess,
    createStudentSuccess,
    updateStudentSuccess,
    clearStudent,
    clearStudents,
    clearHasError,
} = slice.actions;

export const selectStudent = (id: number) => (dispatch: AppDispatch) => { // Change parameter type to number
    try {
        dispatch(selectStudentSuccess(id));
    } catch (error) {
        dispatch(hasError(null));
        throw error;
    }
};

type CreateStudentProps = {
    dateOfBirth: string;
    gender: string;
    address: string;
    mobileNumber: string;
    emailAddress: string;
    highSchoolDocument: string;
    languageProficiency: string;
    // Add any other fields you need for the student
};

export const createStudent = (student: CreateStudentProps) => (dispatch: AppDispatch) => {
    try {
        console.log("Creating student:", student);

        const newStudent: Student = { ...student, id: generateId() };
        dispatch(createStudentSuccess(newStudent));

        console.log("Student created successfully:", newStudent);
    } catch (error) {
        console.error("Error creating student:", error);
        dispatch(hasError("error"));
        throw error;
    }
};

type UpdateStudentPayload = {
    id: number; // Change type to number
    updatedStudent: Omit<Student, 'id'>;
};

export const updateStudent = (payload: UpdateStudentPayload) => (dispatch: AppDispatch) => {
    try {
        dispatch(updateStudentSuccess(payload));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

export const deleteStudent = (id: number) => (dispatch: AppDispatch) => { // Change parameter type to number
    try {
        dispatch(deleteStudentSuccess(id));
    } catch (error) {
        dispatch(hasError("error"));
        throw error;
    }
};

export default slice.reducer;
