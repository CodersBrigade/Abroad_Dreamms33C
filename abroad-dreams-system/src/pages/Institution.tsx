// Pages >> Institution.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Page } from "../components/Page";
import { RHFInput } from "../components/RHFInput";
import useSnackbar from "../hooks/useSnackbar";
import { dispatch, useSelector } from "../redux/store";
import "../styles/pages/institutions.scss";
import { updateInstitution } from "../redux/slices/institution";

export default function Institution() {
    const { selectedInstitution } = useSelector((state) => state.institution);

    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const InstitutionSchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
        // Add validation for other fields as needed
    });

    const defaultValues = {
        name: selectedInstitution?.name || "",
        // Add default values for other fields as needed
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(InstitutionSchema),
        defaultValues,
    });

    const { reset, handleSubmit, watch } = methods;
    const values = watch();

    type UpdateInstitutionPayload = {
        id: string;
        updatedInstitution: FormValuesProps;
    };
    type FormValuesProps = {
        name: string;
        countryId: string; // Add the countryId field
        // Add any other fields you need for the institution
    };
    const onSubmit = async (data: FormValuesProps) => {
        try {
            if (selectedInstitution) {
                const payload: UpdateInstitutionPayload = {
                    id: selectedInstitution.id,
                    updatedInstitution: data,
                };

                // Dispatch the updateInstitution action with the updated data
                dispatch(updateInstitution(payload));
                navigate("/dashboard/institutions"); // Redirect to the institution list page after a successful update
            } else {
                // Handle the case where selectedInstitution is undefined
                throw new Error("Selected institution is undefined");
            }
        } catch (error) {
            reset();
            openSnackbar({ type: "error", message: "Error updating institution" });
        }
    };

    return (
        <Page title="Institution">
            <FormProvider {...methods}>
                <h3 className="main-title">Edit Institution</h3>
                <div className="institution">
                    <div className="institution_preview card">
                        <h4>{values.name}</h4>
                        {/* Display other institution properties as needed */}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="institution_form card">
                        <RHFInput name="name" placeholder="Name" />
                        {/* Add input fields for other institution properties as needed */}
                        <button className="button-primary small-width" type="submit">
                            Save Changes
                        </button>
                    </form>
                </div>
            </FormProvider>
        </Page>
    );
}
