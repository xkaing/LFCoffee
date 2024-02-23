import { Area } from "@ant-design/plots";
import React from "react";

const TopDateAverage = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
    style: {
      fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
      x: {
        labelSpacing: 4,
        style: {
          labelTransform: "rotate(45)",
        },
      },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };
  return <Area {...config} />;
};

export default TopDateAverage;
