// types/student.ts
export type Student = {
    id: number; // Change the type to number
    dateOfBirth: string;
    gender: string;
    address: string;
    mobileNumber: string;
    emailAddress: string;
    highSchoolDocument: string;
    languageProficiency: string;
    // ... other properties
};

export type StudentState = {
    error: Error | string | null;
    students: Student[];
    selectedStudent: Student | undefined;
};
