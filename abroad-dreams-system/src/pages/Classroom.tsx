// Classroom.tsx
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Page } from "../components/Page";
import { RHFInput } from "../components/RHFInput";
import useSnackbar from "../hooks/useSnackbar";
import {dispatch, useDispatch, useSelector} from "../redux/store";
import "../styles/pages/classrooms.scss";
import { updateClassroom } from "../redux/slices/classroom";
import { ClassroomState } from "../types/classroom"; // Add this import


export default function Classroom() {
    const { selectedClassroom } = useSelector((state: { classroom: ClassroomState }) => state.classroom);

    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const ClassroomSchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        capacity: Yup.number().required("Capacity is mandatory"),
        dateAvailability: Yup.string().required("Date Availability is mandatory"),
        // Add validation for other fields as needed
    });

    const defaultValues = {
        name: selectedClassroom?.name || "",
        capacity: selectedClassroom?.capacity || 0, // Ensure capacity is a number
        dateAvailability: selectedClassroom?.dateAvailability || "",
        // Add default values for other fields as needed
    };

    const methods = useForm({
        resolver: yupResolver(ClassroomSchema),
        defaultValues,
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    type UpdateClassroomPayload = {
        id: string;
        updatedClassroom: FormValuesProps;
    };
    type FormValuesProps = {
        name: string;
        capacity: number;
        dateAvailability: string;
        // Add any other fields you need for the classroom
    };

    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (selectedClassroom) {
                const payload: UpdateClassroomPayload = {
                    id: selectedClassroom.id,
                    updatedClassroom: data,
                };

                dispatch(updateClassroom(payload));
                navigate("/dashboard/classrooms");
            } else {
                throw new Error("Selected classroom is undefined");
            }
        } catch (error) {
            reset();
            openSnackbar({ type: "error", message: "Error updating classroom" });
        }
    };

    return (
        <Page title="Classroom">
            <FormProvider {...methods}>
                <h3 className="main-title">Edit Classroom</h3>
                <div className="classroom">
                    <div className="classroom_preview card">
                        <h4>{values.name}</h4>
                        <p>{values.capacity}</p>
                        <p>{values.dateAvailability}</p>
                        {/* Display other classroom properties as needed */}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="classroom_form card">
                        <RHFInput name="name" placeholder="Name" />
                        <RHFInput name="capacity" placeholder="Capacity" />
                        <RHFInput name="dateAvailability" placeholder="Date Availability" />
                        {/* Add input fields for other classroom properties as needed */}
                        <button className="button-primary small-width" type="submit">
                            Save Changes
                        </button>
                    </form>
                </div>
            </FormProvider>
        </Page>
    );
}
