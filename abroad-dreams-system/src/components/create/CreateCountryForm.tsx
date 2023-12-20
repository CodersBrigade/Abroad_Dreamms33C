import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useDispatch } from "../../redux/store";
import { createCountry } from "../../redux/slices/country";

type FormValuesProps = {
    id?: string; // Make id optional if it is not always present in your form values
    name: string;
    shortname: string;
    // Add any other fields you need for the country
};

const CreateCountryForm: React.FC = () => {
    const { openSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const CreateCountrySchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        shortname: Yup.string().required("Short Name is mandatory"),
        // Add validation for other fields
    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(CreateCountrySchema),
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    const onSubmit = async (data: FormValuesProps) => {
        try {
            // Implement logic to create a new country (dispatch an action, API call, etc.)
            // For simplicity, let's just log the data for now
            console.log(data);
            dispatch(createCountry(data));

            openSnackbar({ type: "success", message: "Country created successfully" });
            reset();
        } catch (error) {
            if (error instanceof Error) {
                // Handle errors that are instances of the Error class (e.g., network errors)
                openSnackbar({
                    type: "error",
                    message: error.message || "Error creating country",
                });
            } else {
                // Handle other types of errors
                openSnackbar({
                    type: "error",
                    message: "Error creating country",
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
                <h2 className="title">Create a Country</h2>
                <p className="subtitle">Fill in the details for the new country</p>
                <label>Name:</label>
                <input {...methods.register("name")} />
                <label>Short Name:</label>
                <input {...methods.register("shortname")} />

                {/* Add input fields for other country information */}
                <button className="button-primary" type="submit">
                    Create Country
                </button>
            </form>
        </FormProvider>
    );
};

export default CreateCountryForm;
