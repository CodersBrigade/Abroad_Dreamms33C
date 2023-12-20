// Components >> CreateInstitutionForm.tsx
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useDispatch } from "../../redux/store";
import { createInstitution } from "../../redux/slices/institution";
import { RHFInput } from "../RHFInput"; // Assuming you have an RHFSelect component for dropdowns
import { RHFSelectCountry } from "../RHFSelectCountry"; // Assuming you have an RHFSelect component for dropdowns


type FormValuesProps = {
    name: string;
    countryId: string;
    // Add any other fields you need for the institution
};

const CreateInstitutionForm: React.FC = () => {
    const { openSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const CreateInstitutionSchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        countryId: Yup.string().required("Country is mandatory"), // Add validation for country
        // Add validation for other fields
    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(CreateInstitutionSchema),
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            // Implement logic to create a new institution (dispatch an action, API call, etc.)
            // For simplicity, let's just log the data for now
            console.log(data);
            dispatch(createInstitution(data));

            openSnackbar({ type: "success", message: "Institution created successfully" });
            reset();
        } catch (error) {
            if (error instanceof Error) {
                // Handle errors that are instances of the Error class (e.g., network errors)
                openSnackbar({
                    type: "error",
                    message: error.message || "Error creating institution",
                });
            } else {
                // Handle other types of errors
                openSnackbar({
                    type: "error",
                    message: "Error creating institution",
                });
            }
            reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card"
            >
                <h2 className="title">Create an Institution</h2>
                <p className="subtitle">Fill in the details for the new institution</p>
                <RHFInput name="name" placeholder="Name" />
                <RHFSelectCountry
                    name="countryId"
                    placeholder="Select Country"
                    options={[ /* Your list of country options */ ]}
                />

                {/* Add input fields for other institution information */}
                <button className="button-primary" type="submit">
                    Create Institution
                </button>
            </form>
        </FormProvider>
    );
};

export default CreateInstitutionForm;
