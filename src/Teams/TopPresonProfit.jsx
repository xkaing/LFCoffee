import React from "react";
import { Bar } from "@ant-design/plots";

const TopPresonProfit = ({ data }) => {
  const config = {
    data,
    width: 470,
    xField: "name",
    yField: "value",
    colorField: "value",
    label: {
      text: "value",
      style: {
        textAnchor: (d) => (+d.value > 10.0 ? "right" : "start"),
        fill: (d) => (+d.value > 10.0 ? "#fff" : "#000"),
        dx: (d) => (+d.value > 10.0 ? -5 : 5),
      },
    },
  };
  return <Bar {...config} />;
};

export default TopPresonProfit;
