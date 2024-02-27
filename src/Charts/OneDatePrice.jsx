import { Column } from "@ant-design/plots";
import React, { useContext } from "react";

// 个人-日期-消费-图表
const OneDatePrice = ({ data }) => {
  const config = {
    data,
    height: 450,
    xField: "date",
    yField: "price",
    colorField: "name",
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

export default OneDatePrice;
