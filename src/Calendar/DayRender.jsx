import React from "react";
import { Statistic } from "antd";
import TagName from "./TagName";

const DayRender = ({ payer, expend }) => {
  return (
    <>
      <TagName payer={payer}></TagName>
      {expend && <Statistic title="Expend (CNY)" value={expend} precision={2} />}
    </>
  );
};

export default DayRender;