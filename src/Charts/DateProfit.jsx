import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

const DateProfit = () => {
  const contextData = useContext(DateDataContext) || [];
  const data = contextData.map((item) => {
    return {
      ...item,
      date: item.date.substring(5),
    };
  });
  const config = {
    data,
    xField: "date",
    yField: "profit",
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
