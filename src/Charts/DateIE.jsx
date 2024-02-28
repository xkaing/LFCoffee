import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-收入-图表
const DateIE = () => {
  const dataArr = useContext(DateDataContext) || [];
  const arrI = dataArr.map((item) => {
    return {
      date: item.date,
      income: item.income,
      category: "收入",
    };
  });
  const arrE = dataArr.map((item) => {
    return {
      date: item.date,
      profit: item.profit,
      income: item.expend,
      category: "支出",
    };
  });
  const data = [...arrI, ...arrE];
  const config = {
    data,
    title: "收入和支出",
    xField: "date",
    yField: "income",
    colorField: "category",
    group: true,
    style: {
      insetLeft: 1,
      insetRight: 1,
      insetBottom: 2,
      insetTop: 5,
    },
    axis: {
      x: {
        labelSpacing: 4,
        style: {
          labelTransform: "rotate(45)",
        },
      },
    },
    label: {
      text: (d) => (+d.profit ? d.profit : ""),
      textBaseline: "bottom",
      // textBaseline: (d) => {
      //   if (d.profit > 0) {
      //     return "bottom";
      //   } else {
      //     return "top";
      //   }
      // },
      style: {
        fill: (d) => (+d.profit > 0 ? "#000" : "#cf1322"),
      },
    },
  };
  return <Column {...config} />;
};

export default DateIE;
