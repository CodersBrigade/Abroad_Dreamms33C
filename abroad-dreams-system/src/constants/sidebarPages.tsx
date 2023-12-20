import dashboardSolid from "@iconify/icons-clarity/dashboard-solid";
import barChartRounded from "@iconify/icons-material-symbols/bar-chart-rounded";
import userGroup from "@iconify/icons-mdi/user-group";
import { Icon } from "@iconify/react";

import Country from "../pages/Countries";

export const pages = [
  {
    name: "Home",
    icon: <Icon icon={dashboardSolid} height={22} />,
    link: "home",
  },

  {
    name: "Students",
    icon: <Icon icon={userGroup} height={22} />,
    link: "students",
  },

  {
    name: "Completed Profiles",
    icon: <Icon icon={"mdi:account-file-text"} height={22} />,
    link: "users",
  },

  {
    name: "Applications",
    icon: <Icon icon={"mdi:alarm"} height={22} />,
    link: "users",
  },

  {
    name: "Countries",
    icon: <Icon icon={"mdi:map"} height={22} />,
    link: "countries",
  },

  {
    name: "Institutions",
    icon: <Icon icon={"mdi:account-school"} height={22} />,
    link: "institutions",
  },

  {
    name: "Courses",
    icon: <Icon icon={barChartRounded} height={22} />,
    link: "charts",
  },
  {
    name: "Class-Rooms",
    icon: <Icon icon={"mdi:google-classroom"} height={22} />,
    link: "classrooms",
  },

  {
    name: "Payments",
    icon: <Icon icon={"mdi:account-credit-card"} height={22} />,
    link: "charts",
  },

  {
    name: "System Users",
    icon: <Icon icon={"mdi:account-edit"} height={22} />,
    link: "users",
  },


];
