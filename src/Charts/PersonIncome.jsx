import React, { useContext } from "react";
import { Bar } from "@ant-design/plots";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext";

const PersonIncome = () => {
  const coffeeData = useContext(CoffeeDataContext);
  const personData = coffeeData.personData;
  console.log(personData);

  dateDataArr.forEach((ele) => {
    ele.date = ele.date;
  });

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
