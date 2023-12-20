import CreateCountryForm from "../components/create/CreateCountryForm";
import { Page } from "../components/Page";

export default function NewCountry() {
    return (
        <Page title="Create Country">
            <CreateCountryForm />
        </Page>
    );
}
