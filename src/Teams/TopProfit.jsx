import { Column } from "@ant-design/plots";
import React from "react";

const TopProfit = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
    scale: {
      y: {
        domainMax: 6,
        domainMin: -1,
      },
    },
    label: {
      text: (d) => `${d.value}`,
      textBaseline: (d) => {
        if (d.value > 0) {
          return "bottom";
        } else {
          return "top";
        }
      },
    },
  };
  return <Column {...config} />;
};

export default TopProfit;
