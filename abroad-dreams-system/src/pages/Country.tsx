import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Page } from "../components/Page";
import { RHFInput } from "../components/RHFInput";
import useSnackbar from "../hooks/useSnackbar";
import {dispatch, useSelector} from "../redux/store";
import "../styles/pages/countries.scss";
import {updateCountry} from "../redux/slices/country"; // Adjust the import path based on your file structure



export default function Country() {
    const { selectedCountry } = useSelector((state) => state.country);

    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const CountrySchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        shortname: Yup.string().required("Short Name is mandatory"),
        // Add validation for other fields as needed
    });

    const defaultValues = {
        name: selectedCountry?.name || "",
        shortname: selectedCountry?.shortname || "",
        // Add default values for other fields as needed
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(CountrySchema),
        defaultValues,
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    type UpdateCountryPayload = {
        id: string;
        updatedCountry: FormValuesProps;
    };
    type FormValuesProps = {
        name: string;
        shortname: string;
        // Add any other fields you need for the country
    };
    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (selectedCountry) {
                const payload: UpdateCountryPayload = {
                    id: selectedCountry.id,
                    updatedCountry: data,
                };

                // Dispatch the updateCountry action with the updated data
                dispatch(updateCountry(payload));
                navigate("/dashboard/countries"); // Redirect to the country list page after a successful update
            } else {
                // Handle the case where selectedCountry is undefined
                throw new Error("Selected country is undefined");
            }
        } catch (error) {
            reset();
            openSnackbar({ type: "error", message: "Error updating country" });
        }
    };

    return (
        <Page title="Country">
            <FormProvider {...methods}>
                <h3 className="main-title">Edit Country</h3>
                <div className="country">
                    <div className="country_preview card">
                        <h4>{values.name}</h4>
                        <p>{values.shortname}</p>
                        {/* Display other country properties as needed */}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="country_form card">
                        <RHFInput name="name" placeholder="Name" />
                        <RHFInput name="shortname" placeholder="Short Name" />
                        {/* Add input fields for other country properties as needed */}
                        <button className="button-primary small-width" type="submit">
                            Save Changes
                        </button>
                    </form>
                </div>
            </FormProvider>
        </Page>
    );
}
