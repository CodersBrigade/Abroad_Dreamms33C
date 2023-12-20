import CreateUserForm from "../components/create/CreateUserForm";
import { Page } from "../components/Page";

export default function NewUser() {
  return (
    <Page title="Create User">
      <CreateUserForm />
    </Page>
  );
}
