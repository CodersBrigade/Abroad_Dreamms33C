import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <>
      <div className="d-flex flex-column">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Pending" },
                { id: 1, value: 15, label: "Submitted" },
                { id: 2, value: 20, label: "Approved" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </>
  );
}
