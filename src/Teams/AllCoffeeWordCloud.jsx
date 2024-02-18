import { WordCloud } from "@ant-design/plots";
import React from "react";

const AllCoffeeWordCloud = ({ data }) => {
  const config = {
    paddingTop: 40,
    data,
    layout: { spiral: "rectangular" },
    colorField: "name",
    textField: "name",
  };

  return <WordCloud {...config} />;
};

export default AllCoffeeWordCloud;
