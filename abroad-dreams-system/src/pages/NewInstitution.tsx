import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../hooks/useSnackbar";
import { useDispatch, useSelector } from "../redux/store";
import { createInstitution } from "../redux/slices/institution";
import { RHFInput } from "../components/RHFInput";
import { Page } from "../components/Page";
import { useNavigate } from "react-router-dom";

type FormValuesProps = {
    name: string;
    countryId: string; // Add the countryId field
    // Add any other fields you need for the institution
};

const NewInstitution: React.FC = () => {
    const { openSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const CreateInstitutionSchema = Yup.object().shape({
        name: Yup.string().required("Name is mandatory"),
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
            navigate("/dashboard/institutions"); // Redirect to the institution list page after successful creation
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
        <Page title="Create Institution">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="card">
                    <h2 className="title">Create an Institution</h2>
                    <p className="subtitle">Fill in the details for the new institution</p>
                    <RHFInput name="name" placeholder="Name" />

                    {/* Add input fields for other institution information */}
                    <button className="button-primary" type="submit">
                        Create Institution
                    </button>
                </form>
            </FormProvider>
        </Page>
    );
};

export default NewInstitution;
