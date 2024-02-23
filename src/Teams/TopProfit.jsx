import { Column } from "@ant-design/plots";
import React from "react";

const TopProfit = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
    style: {
      fill: ({ date }) => {
        if (date === "02-02") {
          return "#f5222d";
        }
        return "#2989FF";
      },
    },
    scale: {
      y: {
        domainMax: 6,
        domainMin: -1,
      },
    },
    label: {
      text: "value",
      textBaseline: (d) => {
        if (d.value > 0) {
          return "bottom";
        } else {
          return "top";
        }
      },
      style: {
        fill: (d) => (+d.value > 0 ? "#000" : "#fff"),
      },
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
  };
  return <Column {...config} />;
};

export default TopProfit;
