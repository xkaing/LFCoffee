import React from "react";
import { Tag } from "antd";
import { AndroidFilled, AppleFilled, ChromeFilled } from "@ant-design/icons";

const NameTag = ({ payer }) => {
  let NameIcon = null;
  let NameColor = null;
  const lowerPayer = payer.toLowerCase();

  if (lowerPayer.includes("android")) {
    NameIcon = <AndroidFilled />;
    NameColor = "#87d068";
  } else if (lowerPayer.includes("ios")) {
    NameIcon = <AppleFilled />;
    NameColor = "#2db7f5";
  } else if (lowerPayer.includes("fe")) {
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
