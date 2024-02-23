import React from "react";
import { Bar } from "@ant-design/plots";

const TopPersonIncome = ({ data }) => {
  const config = {
    data,
    xField: "name",
    yField: "value",
    colorField: "category",
    stack: true,
    sort: {
      reverse: true,
      by: "y",
    },
  };
  return <Bar {...config} />;
};

export default TopPersonIncome;
