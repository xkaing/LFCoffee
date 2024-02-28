import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-收入-图表
const DateIncome = () => {
  const data = useContext(DateDataContext) || [];
  const config = {
    data,
    title: "收入",
    xField: "date",
    yField: "income",
    colorField: "payer",
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

export default DateIncome;
