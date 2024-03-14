import { Pie } from "@ant-design/plots";
import React from "react";
const tempeMapping = { 0: "冰", 1: "热" };
export const OneCoffeeTempNum = ({ obj }) => {
  const data = Object.entries(obj).map(([name, value]) => ({
    name: tempeMapping[name],
    value,
  }));

  const config = {
    data,
    width: 450,
    height: 450,
    angleField: "value",
    colorField: "name",
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
  };
  return <Pie {...config} />;
};
