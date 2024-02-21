import { Line } from "@ant-design/plots";
import React from "react";

const TopProfitLine = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default TopProfitLine;
