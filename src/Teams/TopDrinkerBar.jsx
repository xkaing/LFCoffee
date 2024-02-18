import React from "react";
import { Bar } from "@ant-design/plots";

const TopDrinkerBar = ({ arr }) => {
  const config = {
    data: arr,
    xField: "drinker",
    yField: "count",
    colorField: "count",
  };
  return <Bar {...config} />;
};

export default TopDrinkerBar;
