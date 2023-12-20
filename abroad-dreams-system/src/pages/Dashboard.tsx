import hamburgerMd from "@iconify/icons-ci/hamburger-md";
import arrowBackIosRounded from "@iconify/icons-material-symbols/arrow-back-ios-rounded";
import logoutVariant from "@iconify/icons-mdi/logout-variant";
import userIcon from "@iconify/icons-mdi/user";
import { Icon } from "@iconify/react";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import { UserAvatar } from "../components/UserAvatar";
import { pages } from "../constants/sidebarPages";
import { clearUser, selectUser } from "../redux/slices/user";
import { useDispatch, useSelector } from "../redux/store";
import "../styles/dashboard.scss";
import {CombinedState} from "@reduxjs/toolkit";
import {selectCountry} from "../redux/slices/country";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const [showSidebar, setShowSidebar] = useState(isMobile);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showCountryPopup, setShowCountryPopup] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { selectedCountry } = useSelector((state) => state.country);

  const navigate = useNavigate();

  const editUser = () => {
    if (selectedUser?.id) {
      dispatch(selectUser(selectedUser?.id));
    }
    setShowUserPopup(!showUserPopup);
    navigate("user");
  };

  const editCountry = () => {
    if (selectedCountry?.id){
      dispatch(selectCountry(selectedCountry?.id));
    }
    setShowCountryPopup(!showCountryPopup);
    navigate("country");
  };

  const handleLogout = () => {
    setShowUserPopup(!showUserPopup);
    navigate("/login");
    dispatch(clearUser());
  };

  useEffect(() => {
    window.onresize = () => setIsMobile(window.innerWidth <= 820);
  }, [window.innerWidth]);

  return (
    <Page title="Dashboard">
      <main>
        <AnimatePresence>
          {showSidebar || !isMobile ? (
            <m.div
              key="sidebar"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ duration: 0.3 }}
              className="sidebar"
            >
              <m.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.08 }}
                className="sidebar_first-element"
              >
                <div className="logo">
                  <h3>Abroad Dreams System</h3>
                  <img src={"src/assets/abroad-dreams-logo.svg"} alt={"Logo"}  />

                </div>

                {isMobile ? (
                  <Icon
                    icon={arrowBackIosRounded}
                    height={24}
                    className="clickable"
                    onClick={() => setShowSidebar(false)}
                  />
                ) : null}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="user-card"
              >
                <UserAvatar />
                <div className="user-card-data">
                  <p className="user-name">{selectedUser?.name}</p>
                  <p className="user-role">
                    {selectedUser?.email === "admin@gmail.com"
                      ? "admin"
                      : "visitor"}
                  </p>
                </div>
              </m.div>
              <ul className="page-list">
                {pages.map((page, index) => (
                  <m.li
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 * ((index + 1) / 6) }}
                    key={page.name}
                    className="list-item"
                    onClick={() => navigate(`${page.link}`)}
                  >
                    {page.icon}
                    {page.name}
                  </m.li>
                ))}

              </ul>
            </m.div>
          ) : null}
        </AnimatePresence>
        <div className="content">
          <header className="content_header">
            {isMobile ? (
              <Icon
                icon={hamburgerMd}
                height={40}
                className="clickable"
                onClick={() => setShowSidebar(true)}
              />
            ) : null}
            <UserAvatar
              className="clickable"
              onClick={() => setShowUserPopup(!showUserPopup)}
            />
            <AnimatePresence>
              {showUserPopup ? (
                <m.div
                  key="popup"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                  className="account-popup"
                >
                  <div className="list-item" onClick={() => editUser()}>
                    <Icon icon={userIcon} height={22} />
                    Edit User
                  </div>
                  <div className="list-item" onClick={handleLogout}>
                    <Icon icon={logoutVariant} height={22} />
                    Logout
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {showCountryPopup ? (
                  <m.div
                      key="popup"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      exit={{ opacity: 0 }}
                      className="account-popup"
                  >
                    <div className="list-item" onClick={() => editCountry()}>
                      <Icon icon={userIcon} height={22} />
                      Edit Country
                    </div>
                    <div className="list-item" onClick={handleLogout}>
                      <Icon icon={logoutVariant} height={22} />
                      Logout
                    </div>
                  </m.div>
              ) : null}
            </AnimatePresence>
          </header>
          <section className="content_container">
            <div className="content_container_body">
              <Outlet />
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}
