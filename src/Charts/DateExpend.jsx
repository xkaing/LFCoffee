import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-支出-图表
const DateExpend = () => {
  const data = useContext(DateDataContext) || [];
  const config = {
    data,
    title: "支出",
    xField: "date",
    yField: "expend",
    colorField: "expend",
    axis: {
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

export default DateExpend;
