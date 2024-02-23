import React from "react";
import { Tag } from "antd";
import { AndroidFilled, AppleFilled, ChromeFilled } from "@ant-design/icons";

const NameTag = ({ payer }) => {
  let NameIcon = null;
  let NameColor = null;
  const lowerPayer = payer.toLowerCase();

  if (
    lowerPayer.includes("android") ||
    lowerPayer.includes("姜振") ||
    lowerPayer.includes("刘磊") ||
    lowerPayer.includes("李泽晋")
  ) {
    NameIcon = <AndroidFilled />;
    NameColor = "#87d068";
  } else if (
    lowerPayer.includes("ios") ||
    lowerPayer.includes("汪潇翔") ||
    lowerPayer.includes("周洋") ||
    lowerPayer.includes("曹海洋")
  ) {
    NameIcon = <AppleFilled />;
    NameColor = "#2db7f5";
  } else if (lowerPayer.includes("fe") || lowerPayer.includes("汪潇凯")) {
    NameIcon = <ChromeFilled />;
    NameColor = "#f50";
  }

  return (
    <Tag icon={NameIcon} color={NameColor}>
      {payer}
    </Tag>
  );
};

export default NameTag;
