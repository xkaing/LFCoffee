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
      value: valuesSum(value).toNumber(),
      category: "咖啡",
    })
  );
  const profitArr = Object.entries(personData.personProfit).map(
    ([name, value]) => ({
      name,
      value: valuesSum(value).toNumber(),
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

function valuesSum(array) {
  return array.reduce(
    (total, value) => total.plus(new Decimal(value)),
    new Decimal(0)
  );
}

export default PersonIncome;
