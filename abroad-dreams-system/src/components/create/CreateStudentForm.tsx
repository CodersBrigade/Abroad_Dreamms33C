// components/CreateStudentForm.tsx
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useDispatch } from "../../redux/store";
import { createStudent } from "../../redux/slices/student";
import { RHFInput } from "../RHFInput";
import { RHFSelectCountry } from "../RHFSelectCountry";


type FormValuesProps = {
    dateOfBirth: string;
    gender: string;
    address: string;
    mobileNumber: string;
    emailAddress: string;
    highSchoolDocument: string;
    languageProficiency: string;
    // Add any other fields you need for the student
};

const CreateStudentForm: React.FC = () => {
    const { openSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const CreateStudentSchema = Yup.object().shape({
        dateOfBirth: Yup.string().required("Date of Birth is mandatory"),
        gender: Yup.string().required("Gender is mandatory"),
        address: Yup.string().required("Address is mandatory"),
        mobileNumber: Yup.string().required("Mobile Number is mandatory"),
        emailAddress: Yup.string().required("Email Address is mandatory").email("Invalid email address"),
        highSchoolDocument: Yup.string().required("High School Document is mandatory"),
        languageProficiency: Yup.string().required("Language Proficiency is mandatory"),
        // Add validation for other fields
    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(CreateStudentSchema),
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            // Implement logic to create a new student (dispatch an action, API call, etc.)
            // For simplicity, let's just log the data for now
            console.log(data);
            dispatch(createStudent(data));

            openSnackbar({ type: "success", message: "Student created successfully" });
            reset();
        } catch (error) {
            if (error instanceof Error) {
                // Handle errors that are instances of the Error class (e.g., network errors)
                openSnackbar({
                    type: "error",
                    message: error.message || "Error creating student",
                });
            } else {
                // Handle other types of errors
                openSnackbar({
                    type: "error",
                    message: "Error creating student",
                });
            }
            reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="card">
                <h2 className="title">Create a Student</h2>
                <p className="subtitle">Fill in the details for the new student</p>

                <RHFInput name="dateOfBirth" placeholder="Date of Birth" type="date" />
                <RHFInput name="gender" placeholder="Gender" />
                <RHFInput name="address" placeholder="Address" />
                <RHFInput name="mobileNumber" placeholder="Mobile Number" />
                <RHFInput name="emailAddress" placeholder="Email Address" />
                <RHFInput name="highSchoolDocument" placeholder="High School Document" />
                <RHFInput name="languageProficiency" placeholder="Language Proficiency" />

                {/* Add input fields for other student information */}
                <button className="button-primary" type="submit">
                    Create Student
                </button>
            </form>
        </FormProvider>
    );
};

export default CreateStudentForm;
