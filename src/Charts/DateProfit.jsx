import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-利润-图表
const DateProfit = () => {
  const data = useContext(DateDataContext) || [];
  const config = {
    data,
    title: "利润",
    xField: "date",
    yField: "profit",
    style: {
      fill: ({ profit }) => {
        return profit > 0 ? "#2989FF" : "#f5222d";
      },
    },
    scale: {
      y: {
        domainMax: 9,
        domainMin: -6,
      },
    },
    label: {
      text: "profit",
      textBaseline: (d) => {
        if (d.profit > 0) {
          return "bottom";
        } else {
          return "top";
        }
      },
      style: {
        fill: (d) => (+d.profit > 0 ? "#000" : "#fff"),
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

export default DateProfit;
