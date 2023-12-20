// Pages >> Institutions.tsx
import React from "react";
import { Icon } from "@iconify/react";
import baselineDelete from "@iconify/icons-ic/baseline-delete";
import editSquareOutline from "@iconify/icons-material-symbols/edit-square-outline";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import useSnackbar from "../hooks/useSnackbar";
import { deleteInstitution, selectInstitution } from "../redux/slices/institution";
import { useDispatch, useSelector } from "../redux/store";
import "../styles/pages/institutions.scss";
import { Institution } from "../types/institution";
import { Country } from "../types/country"; // Import the Country type


const Institutions: React.FC = () => {
    const dispatch = useDispatch();
    const { openSnackbar } = useSnackbar();
    const { institutions, countries } = useSelector((state) => ({
        institutions: state.institution.institutions,
        countries: state.country.countries,
    }));
    const navigate = useNavigate();

    const getCountryNameById = (countryId: string): string => {
        const country = countries.find((c) => c.id === countryId);
        return country ? country.name : "Unknown Country";
    };

    const select = (id: string) => {
        try {
            dispatch(selectInstitution(id));
            navigate("/dashboard/institution");
        } catch (error) {
            openSnackbar({ type: "error", message: "Error editing" });
        }
    };

    const remove = (id: string) => {
        if (window.confirm("Do you really want to delete?")) {
            try {
                dispatch(deleteInstitution(id));
                openSnackbar({ type: "success", message: "Deleted successfully" });
            } catch (error) {
                openSnackbar({ type: "error", message: "Error deleting" });
            }
        }
    };

    return (
        <Page title="Institution List">
            <div className="title-and-button">
                <h3 className="main-title">Institution List</h3>
                <div>
                    <button
                        className="button-primary new-institution"
                        onClick={() => navigate("new")}
                    >
                        Add New
                    </button>
                </div>
            </div>
            <div className="institutions card">
                <table cellSpacing="0">
                    <thead>
                    {["Name", "Country"].map((item) => (
                        <th key={item}>{item}</th>
                    ))}
                    <th style={{ width: 60 }} />
                    <th style={{ width: 60 }} />
                    </thead>
                    <tbody>
                    {institutions.length > 0 ? (
                        institutions.map((row: Institution) => (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{getCountryNameById(row.countryId)}</td>
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
                                <div className="no-data">No institutions</div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </Page>
    );
};

export default Institutions;
