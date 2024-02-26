import { Pie } from "@ant-design/plots";
import React, { useContext } from "react";
import { CupsDataContext } from "../contexts/CoffeeDataContext";

const tempeMapping = { 0: "冰", 1: "热" };

const CoffeeTempNum = () => {
  const contextData = useContext(CupsDataContext);
  if (!contextData) {
    return null;
  }
  const coffeeTempNum = contextData.coffeeTempNum;
  const data = Object.entries(coffeeTempNum).map(([key, count]) => ({
    name: tempeMapping[key],
    count,
  }));

  const config = {
    data,
    angleField: "count",
    colorField: "name",
    label: {
      text: "count",
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

export default CoffeeTempNum;
