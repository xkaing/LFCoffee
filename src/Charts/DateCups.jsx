import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-收入-图表
const DateCups = () => {
  const data = useContext(DateDataContext) || [];
  const config = {
    data,
    title: "杯数",
    xField: "date",
    yField: "cups",
    colorField: "cups",
    axis: {
      x: {
        labelSpacing: 4,
        style: {
          labelTransform: "rotate(45)",
        },
      },
    },
    legend: {
      color: {
        position: "right",
        layout: { justifyContent: "center" },
      },
    },
  };
  return <Column {...config} />;
};

export default DateCups;
