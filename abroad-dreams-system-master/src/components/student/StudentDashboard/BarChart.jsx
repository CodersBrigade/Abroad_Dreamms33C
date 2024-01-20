import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function BasicBars() {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column">
        <AdminHeader />
      </div>
      <div>
        <AdminSidebar />
      </div>

      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
      />
    </div>
  );
}
