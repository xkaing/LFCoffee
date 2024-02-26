import React, { useContext } from "react";
import { Bar } from "@ant-design/plots";
import { PersonDataContext } from "../contexts/CoffeeDataContext";

const PersonCupsNum = () => {
  const personData = useContext(PersonDataContext);
  if (!personData) {
    return null;
  }
  const data = Object.entries(personData.personCupsnum).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  data.sort((a, b) => b.value - a.value); //降序

  const config = {
    data,
    xField: "name",
    yField: "value",
    colorField: "value",
  };
  return <Bar {...config} />;
};

export default PersonCupsNum;
