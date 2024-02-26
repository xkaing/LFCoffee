import React, { useContext } from "react";
import { Bar } from "@ant-design/plots";
import { PersonDataContext } from "../contexts/CoffeeDataContext";
import Decimal from "decimal.js";

const PersonIncome = () => {
  const personData = useContext(PersonDataContext);

  if (!personData) {
    return null;
  }

  const expendArr = Object.entries(personData.personExpend).map(
    ([name, value]) => ({
      name,
      value: value.reduce((a, b) => a + b, 0),
      category: "咖啡",
    })
  );
  const profitArr = Object.entries(personData.personProfit).map(
    ([name, value]) => ({
      name,
      value: value.reduce((a, b) => a + b, 0),
      category: "小费",
    })
  );
  expendArr.sort((a, b) => b.value - a.value);
  profitArr.sort((a, b) => b.value - a.value);
  const data = expendArr.concat(profitArr);

  const config = {
    data,
    xField: "name",
    yField: "value",
    colorField: "category",
    stack: true,
    sort: {
      reverse: true,
      by: "y",
    },
  };
  return <Bar {...config} />;
};

export default PersonIncome;
