import React from "react";
import { Pie } from "@ant-design/plots";

const RatioTempPie = ({ data }) => {
  const config = {
    data,
    angleField: "count",
    colorField: "name",
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
  };
  return <Pie {...config} />;
};

export default RatioTempPie;
