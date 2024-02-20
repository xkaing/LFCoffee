import { Line } from "@ant-design/plots";
import React from "react";

const TopAverageLine = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
  };
  return <Line {...config} />;
};

export default TopAverageLine;
