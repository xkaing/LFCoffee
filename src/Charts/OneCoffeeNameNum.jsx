import { Column, Pie } from "@ant-design/plots";
import React from "react";

export const OneCoffeeNameNumColumn = ({ obj }) => {
  const data = Object.entries(obj).map(([name, value]) => ({
    name,
    value,
  }));
  data.sort((a, b) => a.value - b.value); //升序
  const config = {
    data,
    width: 450,
    height: 450,
    xField: "name",
    yField: "value",
    colorField: "value",
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

export const OneCoffeeNameNumPie = ({ obj }) => {
  const data = Object.entries(obj).map(([name, value]) => ({
    name,
    value,
  }));
  data.sort((a, b) => a.value - b.value); //升序

  const config = {
    data,
    width: 450,
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
          text: "口味",
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
