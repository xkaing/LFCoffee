import { WordCloud } from "@ant-design/plots";
import React, { useContext } from "react";
import { CupsDataContext } from "../contexts/CoffeeDataContext";

export const CoffeeNameNumWordCloud = () => {
  const cupsData = useContext(CupsDataContext);
  if (!cupsData) {
    return null;
  }
  const coffeeNameNum = cupsData.coffeeNameNum;
  const data = Object.entries(coffeeNameNum).map(([name, value]) => ({
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
