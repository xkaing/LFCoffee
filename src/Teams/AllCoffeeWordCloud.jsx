import { WordCloud } from "@ant-design/plots";
import React from "react";

const AllCoffeeWordCloud = ({ data }) => {
  console.log(data);

  const config = {
    width: 1000,
    height: 400,
    autoFit: false,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json",
    },
    layout: {
      imageMask:
        "https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original",
      fontSize: 10,
    },
    colorField: "name",
    textField: "name",
    legend: false,
  };

  return <WordCloud {...config} />;
};

export default AllCoffeeWordCloud;

/* config
[
  {
    "value": 9,
    "name": "AntV"
  },
  {
    "value": 8,
    "name": "F2"
  },
]
*/
