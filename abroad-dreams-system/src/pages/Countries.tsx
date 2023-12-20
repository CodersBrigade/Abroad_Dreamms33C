import React from "react";
import baselineDelete from "@iconify/icons-ic/baseline-delete";
import editSquareOutline from "@iconify/icons-material-symbols/edit-square-outline";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import useSnackbar from "../hooks/useSnackbar";
import { deleteCountry, selectCountry } from "../redux/slices/country";
import { useDispatch, useSelector } from "../redux/store";
import "../styles/pages/countries.scss";
import { Country } from "../types/country";

// ... (other imports)

const Countries: React.FC = () => {
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const { countries } = useSelector((state) => state.country);
    const navigate = useNavigate();

    const select = (id: string) => {
        try {
            dispatch(selectCountry(id));
            navigate("/dashboard/country");
        } catch (error) {
            openSnackbar({ type: "error", message: "Error editing" });
        }
    };

    const edit = (id: string) => {
        // Add logic to handle the edit action, e.g., redirect to the edit page
        // You can use 'navigate' to redirect to the edit page or implement your own logic
        try {
            // Example: Redirect to the edit page
            navigate(`/dashboard/country/edit/${id}`);
        } catch (error) {
            openSnackbar({ type: "error", message: "Error editing" });
        }
    };

    const remove = (id: string) => {
        if (window.confirm("Do you really want to delete?")) {
            try {
                dispatch(deleteCountry(id));
                openSnackbar({ type: "success", message: "Deleted successfully" });
            } catch (error) {
                openSnackbar({ type: "error", message: "Error deleting" });
            }
        }
    };

    return (
        <Page title="Country List">
            <div className="title-and-button">
                <h3 className="main-title">Country List</h3>
                <div>
                    <button
                        className="button-primary new-country"
                        onClick={() => navigate("new")}
                    >
                        Add New
                    </button>
                </div>
            </div>
            <div className="countries card">
                <table cellSpacing="0">
                    <thead>
                    {["Name", "Short Name"].map((item) => (
                        <th key={item}>{item}</th>
                    ))}
                    <th style={{ width: 60 }} />
                    <th style={{ width: 60 }} />
                    </thead>
                    <tbody>
                    {countries.length > 0 ? (
                        countries.map((row: Country) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.shortname}</td>
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
                                <div className="no-data">No countries</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </Page>
    );
};

export default Countries;

