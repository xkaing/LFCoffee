import React, { useContext } from "react";
import { CupsDataContext } from "../contexts/CoffeeDataContext";
import { Pie } from "@ant-design/plots";
const priceMapping = {
  23: "CNY: 23",
  29: "CNY: 29",
  32: "CNY: 32",
  35: "CNY: 35",
  38: "CNY: 38",
};

const CoffeePriceNum = () => {
  const contextData = useContext(CupsDataContext);
  if (!contextData) {
    return null;
  }
  const coffeePriceNum = contextData.coffeePriceNum;
  const data = Object.entries(coffeePriceNum).map(([key, count]) => ({
    name: priceMapping[key],
    count,
  }));

  const config = {
    data,
    angleField: "count",
    colorField: "name",
    paddingRight: 80,
    innerRadius: 0.6,
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
    annotations: [
      {
        type: "text",
        style: {
          text: "价位",
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

export default CoffeePriceNum;
