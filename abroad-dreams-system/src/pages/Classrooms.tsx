// Classrooms.tsx
import React from "react";
import baselineDelete from "@iconify/icons-ic/baseline-delete";
import editSquareOutline from "@iconify/icons-material-symbols/edit-square-outline";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import useSnackbar from "../hooks/useSnackbar";
import { deleteClassroom, selectClassroom } from "../redux/slices/classroom";
import { useDispatch, useSelector } from "../redux/store";
import "../styles/pages/classrooms.scss";
import { Classroom } from "../types/classroom";

const Classrooms: React.FC = () => {
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const { classrooms } = useSelector((state) => state.classroom);
    const navigate = useNavigate();

    const select = (id: string) => {
        try {
            dispatch(selectClassroom(id));
            navigate("/dashboard/classroom");
        } catch (error) {
            openSnackbar({ type: "error", message: "Error editing" });
        }
    };

    const edit = (id: string) => {
        try {
            navigate(`/dashboard/classroom/edit/${id}`);
        } catch (error) {
            openSnackbar({ type: "error", message: "Error editing" });
        }
    };

    const remove = (id: string) => {
        if (window.confirm("Do you really want to delete?")) {
            try {
                dispatch(deleteClassroom(id));
                openSnackbar({ type: "success", message: "Deleted successfully" });
            } catch (error) {
                openSnackbar({ type: "error", message: "Error deleting" });
            }
        }
    };

    return (
        <Page title="Classroom List">
            <div className="title-and-button">
                <h3 className="main-title">Classroom List</h3>
                <div>
                    <button
                        className="button-primary new-classroom"
                        onClick={() => navigate("new")}
                    >
                        Add New
                    </button>
                </div>
            </div>
            <div className="classrooms card">
                <table cellSpacing="0">
                    <thead>
                    {["Name", "Capacity", "Date Availability"].map((item) => (
                        <th key={item}>{item}</th>
                    ))}
                    <th style={{ width: 60 }} />
                    <th style={{ width: 60 }} />
                    </thead>
                    <tbody>
                    {classrooms.length > 0 ? (
                        classrooms.map((row: Classroom) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.capacity}</td>
                                <td>{row.dateAvailability}</td>
                                <td width={60}>
                                    <Icon
                                        icon={editSquareOutline}
                                        height={24}
                                        onClick={() => select(row.id)}
                                        className="icon"
                                    />
                                </td>
                                <td width={60}>
                                    <Icon
                                        icon={baselineDelete}
                                        height={24}
                                        onClick={() => remove(row.id)}
                                        className="icon"
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>
                                <div className="no-data">No classrooms</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </Page>
    );
};

export default Classrooms;
