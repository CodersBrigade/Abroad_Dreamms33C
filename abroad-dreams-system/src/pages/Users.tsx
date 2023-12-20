import baselineDelete from "@iconify/icons-ic/baseline-delete";
import editSquareOutline from "@iconify/icons-material-symbols/edit-square-outline";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import useSnackbar from "../hooks/useSnackbar";
import { deleteUser, selectUser } from "../redux/slices/user";
import { useDispatch, useSelector } from "../redux/store";
import "../styles/pages/users.scss";
import { User } from "../types/user";

export default function Users() {
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackbar();
  const { users } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const select = (id: string) => {
    try {
      dispatch(selectUser(id));
      navigate("/dashboard/user");
    } catch (error) {
      openSnackbar({ type: "error", message: "Error" });
    }
  };

  const remove = (id: string) => {
    if (confirm("Do you really want to delete?")) {
      try {
        dispatch(deleteUser(id));
        openSnackbar({ type: "success", message: "User Delete Success!" });
      } catch (error) {
        openSnackbar({ type: "error", message: "Error Delete!" });
      }
    }
  };

  return (
    <Page title="User List">
      <div className="title-and-button">
        <h3 className="main-title">User List</h3>
        <div>
          <button
            className="button-primary new-user"
            onClick={() => navigate("new")}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="users card">
        <table cellSpacing="0">
          <thead>
            {["Name", "Email", "Password"].map((item) => (
              <th key={item}>{item}</th>
            ))}
            <th style={{ width: 60 }} />
            <th style={{ width: 60 }} />
          </thead>
          <tbody>
          {users && users.length > 0 ? (
              users.map((row: User) => (
                  <tr key={row.email}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{"●".repeat(row.password.length)}</td>
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
                  <div className="no-data">No users</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
