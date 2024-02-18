import React from "react";
import { Pie } from "@ant-design/plots";

const RatioPricePie = ({ arr }) => {
  const config = {
    data: arr,
    angleField: "count",
    colorField: "name",
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: "count",
      style: {
        fontWeight: "bold",
      },
      fontSize: 14,
    },
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
        itemLabelFontSize: 14,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "价位",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  return <Pie {...config} />;
};

export default RatioPricePie;
