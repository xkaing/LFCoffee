import { Area } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-平均价格-图表
const DateAverage = () => {
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
    yField: "average",
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

export default DateAverage;
