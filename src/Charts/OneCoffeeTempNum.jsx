import { Column, Pie } from "@ant-design/plots";
import React from "react";
const tempeMapping = { 0: "冰", 1: "热" };
export const OneCoffeeTempNum = ({ obj }) => {
  const data = Object.entries(obj).map(([name, value]) => ({
    name: tempeMapping[name],
    value,
  }));

  const config = {
    data,
    width: 400,
    height: 400,
    angleField: "value",
    colorField: "name",
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
      fontSize: 14,
    },
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
        itemLabelFontSize: 14,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "温度",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  return <Pie {...config} />;
};
