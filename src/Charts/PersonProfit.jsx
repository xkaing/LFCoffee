import React, { useContext } from "react";
import { Bar } from "@ant-design/plots";
import { PersonDataContext } from "../contexts/CoffeeDataContext";
import Decimal from "decimal.js";

const PersonProfit = () => {
  const personData = useContext(PersonDataContext) || {};

  const data = Object.entries(personData.personProfit)
    .filter(([name]) => name !== "汪潇凯")
    .map(([name, value]) => ({
      name,
      value: valuesSum(value).toNumber(),
    }))
    .sort((a, b) => b.value - a.value);

  const config = {
    data,
    xField: "name",
    yField: "value",
    style: {
      fill: ({ value }) => {
        return value > 0 ? "#2989FF" : "#f5222d";
      },
    },
  };
  return <Bar {...config} />;
};

export default PersonProfit;

function valuesSum(array) {
  return array.reduce(
    (total, value) => total.plus(new Decimal(value)),
    new Decimal(0)
  );
}
