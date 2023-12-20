import beamingFaceWithSmilingEyes from "@iconify/icons-fluent-emoji/beaming-face-with-smiling-eyes";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../../redux/store";
import "../../../styles/pages/home.scss";

export function Welcome() {
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);

  return (
    <div className="card welcome">
      <div className="welcome_content">
        <h4>Welcome {selectedUser?.name}!</h4>

      </div>
      <div className="image-container">
        <Icon icon={"dashicons:smiley"} height={140} className="icon" />
      </div>
    </div>
  );
}
