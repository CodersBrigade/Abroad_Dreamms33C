// NewClassroom.tsx
import React from "react";
import CreateClassroomForm from "../components/create/CreateClassroomForm";
import { Page } from "../components/Page";

export default function NewClassroom() {
    return (
        <Page title="Create Classroom">
            <CreateClassroomForm />
        </Page>
    );
}
