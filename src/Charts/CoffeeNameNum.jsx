import { Column, Treemap, WordCloud } from "@ant-design/plots";
import React, { useContext } from "react";
import { CupsDataContext } from "../contexts/CoffeeDataContext";

// 词云图
export const CoffeeNameNumWordCloud = () => {
  const cupsData = useContext(CupsDataContext);
  if (!cupsData) {
    return null;
  }
  const data = Object.entries(cupsData.coffeeNameNum).map(([name, value]) => ({
    name,
    value,
  }));

  const config = {
    paddingTop: 40,
    data,
    // title: "词云图",
    layout: { spiral: "rectangular" },
    colorField: "name",
    textField: "name",
  };

  return <WordCloud {...config} />;
};

// 柱状图
export const CoffeeNameNumColumn = () => {
  const cupsData = useContext(CupsDataContext);
  if (!cupsData) {
    return null;
  }
  const data = Object.entries(cupsData.coffeeNameNum).map(([name, value]) => ({
    name,
    value,
  }));
  data.sort((a, b) => a.value - b.value); //升序
  const config = {
    data,
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

// 矩阵树图
export const CoffeeNameNumTreemap = () => {
  const cupsData = useContext(CupsDataContext);
  if (!cupsData) {
    return null;
  }
  const data = Object.entries(cupsData.coffeeNameNum).map(([name, value]) => ({
    name,
    value,
  }));
  data.sort((a, b) => a.value - b.value); //升序
  const config = {
    title: "常喝咖啡",
    data: {
      name: "root",
      children: data,
    },
    colorField: "value",
    valueField: "value",
    scale: {
      color: {
        range: [
          "#4e79a7",
          "#f28e2c",
          "#e15759",
          "#76b7b2",
          "#59a14f",
          "#edc949",
          "#af7aa1",
          "#ff9da7",
          "#9c755f",
          "#bab0ab",
        ],
      },
    },
    legend: false,
  };
  return <Treemap {...config} />;
};
