// CreateClassroomForm.tsx
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useDispatch } from "../../redux/store";
import { createClassroom } from "../../redux/slices/classroom";
import { RHFInput } from "../RHFInput";

type FormValuesProps = {
    name: string;
    capacity: number;
    dateAvailability: string;
    // Add any other fields you need for the classroom
};

const CreateClassroomForm: React.FC = () => {
    const { openSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const ClassroomSchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        capacity: Yup.number().required("Capacity is mandatory"),
        dateAvailability: Yup.string().required("Date Availability is mandatory"),
        // Add validation for other fields
    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(ClassroomSchema),
    });

    const { reset, handleSubmit } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            dispatch(createClassroom(data));
            openSnackbar({ type: "success", message: "Classroom created successfully" });
            reset();
        } catch (error) {
            if (error instanceof Error) {
                openSnackbar({
                    type: "error",
                    message: error.message || "Error creating classroom",
                });
            } else {
                openSnackbar({
                    type: "error",
                    message: "Error creating classroom",
                });
            }
            reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="card">
                <h2 className="title">Create a Classroom</h2>
                <p className="subtitle">Fill in the details for the new classroom</p>
                <RHFInput name="name" placeholder="Name" />
                <RHFInput name="capacity" placeholder="Capacity" />
                <RHFInput name="dateAvailability" placeholder="Date Availability" />
                {/* Add input fields for other classroom information */}
                <button className="button-primary" type="submit">
                    Create Classroom
                </button>
            </form>
        </FormProvider>
    );
};

export default CreateClassroomForm;
