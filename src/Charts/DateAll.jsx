import { DualAxes } from "@ant-design/plots";
import React, { useContext } from "react";
import { DateDataContext } from "../contexts/CoffeeDataContext";

// 日期-所有数据-图表
const DateExpend = () => {
  const dataArr = useContext(DateDataContext) || [];
  const arrI = dataArr.map((item) => {
    return {
      date: item.date,
      value: item.income,
      type: "收入",
    };
  });
  const arrE = dataArr.map((item) => {
    return {
      date: item.date,
      value: item.expend,
      type: "支出",
    };
  });
  const arrP = dataArr.map((item) => {
    return {
      date: item.date,
      value2: item.profit,
      category: "利润",
    };
  });
  const arrA = dataArr.map((item) => {
    return {
      date: item.date,
      value2: item.average,
      category: "均价",
    };
  });
  const dataInterval = [...arrI, ...arrE];
  const dataLine = [...arrP, ...arrA];

  if (!dataInterval || !dataLine) {
    console.log("1111");
    return null;
  }

  const config = {
    xField: "date",
    legend: {
      color: {
        position: "bottom",
        layout: { justifyContent: "center" },
      },
    },
    children: [
      {
        data: dataInterval,
        type: "interval",
        yField: "value",
        colorField: "type",
        group: true,
        style: { maxWidth: 80 },
        interaction: { elementHighlightByColor: { background: true } },
      },
      {
        data: dataLine,
        type: "line",
        yField: "value2",
        colorField: "category",
        style: { lineWidth: 2 },
        axis: { y: { position: "right" } },
        scale: { series: { independent: true } },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default DateExpend;
