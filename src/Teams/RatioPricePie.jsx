import React from "react";
import { Pie } from "@ant-design/plots";

const RatioPricePie = ({ arr }) => {
  const config = {
    data: arr,
    angleField: "count",
    colorField: "name",
    label: {
      text: "count",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default RatioPricePie;
