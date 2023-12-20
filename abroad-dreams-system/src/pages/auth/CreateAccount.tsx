import CreateUserForm from "../../components/create/CreateUserForm";
import { Page } from "../../components/Page";

export default function CreateAccount() {
  return (
    <Page title="Login" notLogged>
      <CreateUserForm />
    </Page>
  );
}
