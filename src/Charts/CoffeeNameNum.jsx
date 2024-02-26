import { WordCloud } from "@ant-design/plots";
import { Column } from "@ant-design/plots";
import React, { useContext } from "react";
import { CupsDataContext } from "../contexts/CoffeeDataContext";

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
    layout: { spiral: "rectangular" },
    colorField: "name",
    textField: "name",
  };

  return <WordCloud {...config} />;
};

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
