import React from "react";
import { Tag } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4431122_rut41t8545r.js",
});

const CupsTag = ({ count }) => {
  let arr = new Array(count).fill(0);
  const cupsIconArr = arr.map((_, index) => {
    return (
      <IconFont
        type="icon-coffee-cold1"
        key={index}
        style={{
          fontSize: "1.1em",
        }}
      />
    );
  });
  return <div>{cupsIconArr}</div>;
};

export default CupsTag;
