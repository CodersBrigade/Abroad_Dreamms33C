// Student.tsx
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "../redux/store";
import { createStudent, updateStudent } from "../redux/slices/student";
import { RHFInput } from "../components/RHFInput";
import useSnackbar from "../hooks/useSnackbar";
import { Page } from "../components/Page";

type FormValuesProps = {
    id?: string; // Make the id property optional
    dateOfBirth: string;
    gender: string;
    address: string;
    mobileNumber: string;
    emailAddress: string;
    highSchoolDocument: string;
    languageProficiency: string;
    // Add any other fields you need for the student
};


const Student: React.FC = () => {
    const { selectedStudent } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();

    const StudentSchema = Yup.object().shape({
        dateOfBirth: Yup.string().required("Date of Birth is mandatory"),
        gender: Yup.string().required("Gender is mandatory"),
        address: Yup.string().required("Address is mandatory"),
        mobileNumber: Yup.string().required("Mobile Number is mandatory"),
        emailAddress: Yup.string().required("Email Address is mandatory"),
        highSchoolDocument: Yup.string().required("High School Document is mandatory"),
        languageProficiency: Yup.string().required("Language Proficiency is mandatory"),
        // Add validation for other fields
    });

    const defaultValues: FormValuesProps = {
        dateOfBirth: selectedStudent?.dateOfBirth || "",
        gender: selectedStudent?.gender || "",
        address: selectedStudent?.address || "",
        mobileNumber: selectedStudent?.mobileNumber || "",
        emailAddress: selectedStudent?.emailAddress || "",
        highSchoolDocument: selectedStudent?.highSchoolDocument || "",
        languageProficiency: selectedStudent?.languageProficiency || "",
        // Add default values for other fields
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(StudentSchema),
        defaultValues,
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (selectedStudent) {
                // If there is a selected student, dispatch the updateStudent action
                dispatch(updateStudent({ id: selectedStudent.id, updatedStudent: data as any }));
                openSnackbar({ type: "success", message: "Student updated successfully" });
            } else {
                // If there is no selected student, dispatch the createStudent action
                dispatch(createStudent(data as any));
                openSnackbar({ type: "success", message: "Student created successfully" });
            }

            reset();
        } catch (error) {
            openSnackbar({
                type: "error",
                message: error instanceof Error ? error.message : "Error updating/creating student",
            });
            reset();
        }
    };


    return (
        <Page title="Student">
            <FormProvider {...methods}>
                <h3 className="main-title">{selectedStudent ? "Edit" : "Create"} Student</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="student-form card">
                    {/* Add input fields for student information */}
                    <RHFInput name="dateOfBirth" placeholder="Date of Birth" />
                    <RHFInput name="gender" placeholder="Gender" />
                    <RHFInput name="address" placeholder="Address" />
                    <RHFInput name="mobileNumber" placeholder="Mobile Number" />
                    <RHFInput name="emailAddress" placeholder="Email Address" />
                    <RHFInput name="highSchoolDocument" placeholder="High School Document" />
                    <RHFInput name="languageProficiency" placeholder="Language Proficiency" />

                    <button className="button-primary" type="submit">
                        {selectedStudent ? "Update Student" : "Create Student"}
                    </button>
                </form>
            </FormProvider>
        </Page>
    );
};

export default Student;
