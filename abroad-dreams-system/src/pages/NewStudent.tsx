// pages/NewStudent.tsx
import React from "react";
import CreateStudentForm from "../components/create/CreateStudentForm";
import { Page } from "../components/Page";

const NewStudent: React.FC = () => {
    return (
        <Page title="Create Student">
            <CreateStudentForm />
        </Page>
    );
};

export default NewStudent;
