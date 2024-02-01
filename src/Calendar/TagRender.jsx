import React from "react";
import { Tag, Statistic } from "antd";
import { AndroidFilled, AppleFilled, ChromeFilled } from "@ant-design/icons";

const TagRender = ({ payer, expend }) => {
  let TagName = null;
  let TagColor = null;
  const lowerPayer = payer.toLowerCase();

  if (lowerPayer.includes("android")) {
    TagName = <AndroidFilled />;
    TagColor = "#87d068";
  } else if (lowerPayer.includes("ios")) {
    TagName = <AppleFilled />;
    TagColor = "#2db7f5";
  } else if (lowerPayer.includes("fe")) {
    TagName = <ChromeFilled />;
    TagColor = "#f50";
  }

  return (
    <>
      <Tag icon={TagName} color={TagColor}>
        {payer}
      </Tag>
      { expend &&  <Statistic title="支出 (CNY)" value={expend} precision={2} />}
    </>
  );
};

export default TagRender;