import React from "react";
import baselineDelete from "@iconify/icons-ic/baseline-delete";
import editSquareOutline from "@iconify/icons-material-symbols/edit-square-outline";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import useSnackbar from "../hooks/useSnackbar";
import { deleteStudent, selectStudentSuccess } from "../redux/slices/student";
import { useDispatch, useSelector } from "../redux/store";
import "../styles/pages/students.scss";
import { Student } from "../types/student";

const Students: React.FC = () => {
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const { students } = useSelector((state) => state.student);
    const navigate = useNavigate();

    const select = (id: number) => {
        try {
            const studentId = (id);
            dispatch(selectStudentSuccess(studentId));
            navigate("/dashboard/student");
        } catch (error) {
            openSnackbar({ type: "error", message: "Error editing" });
        }
    };

    const remove = (id: number) => {
        if (window.confirm("Do you really want to delete?")) {
            try {
                const studentId = (id);
                dispatch(deleteStudent(studentId));
                openSnackbar({ type: "success", message: "Deleted successfully" });
            } catch (error) {
                openSnackbar({ type: "error", message: "Error deleting" });
            }
        }
    };

    const handleApply = (studentId: number) => {
        // Example logic: Show a confirmation alert
        const shouldApply = window.confirm("Do you want to apply for this student?");
        if (shouldApply) {
            // Replace the following line with the actual logic for applying
            console.log(`Applying for student with ID: ${studentId}`);
        }
    };

    return (
        <Page title="Student List">
            <div className="title-and-button">
                <h3 className="main-title">Student List</h3>
                <div>
                    <button className="button-primary new-student" onClick={() => navigate("new")}>
                        Add New
                    </button>
                </div>
            </div>
            <div className="students card">
                <table cellSpacing="0">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                        <th>Email Address</th>
                        <th>Documents?</th>
                        <th>Language Proficiency</th>
                        <th style={{ width: 60 }} />
                        <th style={{ width: 60 }} />
                        <th style={{ width: 60 }} />
                    </tr>
                    </thead>
                    <tbody>
                    {students.length > 0 ? (
                        students.map((row: Student) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.dateOfBirth}</td>
                                <td>{row.gender}</td>
                                <td>{row.address}</td>
                                <td>{row.mobileNumber}</td>
                                <td>{row.emailAddress}</td>
                                <td>{row.highSchoolDocument}</td>
                                <td>{row.languageProficiency}</td>
                                <td width={60}>
                                    <Icon icon={editSquareOutline} height={24} onClick={() => select(row.id)} className="icon" />
                                </td>
                                <td width={60}>
                                    <Icon icon={baselineDelete} height={24} onClick={() => remove(row.id)} className="icon" />
                                </td>
                                <td width={60}>
                                    {row.highSchoolDocument === "Complete" && (
                                        <button
                                            className="button-primary apply-button"
                                            onClick={() => handleApply(row.id)}
                                        >
                                            Apply
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11}>
                                <div className="no-data">No students</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </Page>
    );
};

export default Students;
