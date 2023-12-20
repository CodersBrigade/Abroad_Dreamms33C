// types/classroom.ts
export type Classroom = {
    id: string;
    name: string;
    capacity: number;
    dateAvailability: string;
    // Add any other fields you need for the classroom
};


export type ClassroomState = {
    error: Error | string | null;
    classrooms: Classroom[];
    selectedClassroom: Classroom | undefined;
};
