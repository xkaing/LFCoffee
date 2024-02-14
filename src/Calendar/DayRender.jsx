import React from "react";
import { Statistic } from "antd";
import NameTag from "../components/NameTag";

const DayRender = ({ payer, expend }) => {
  return (
    <>
      <NameTag payer={payer}></NameTag>
      {expend && (
        <Statistic title="Expend (CNY)" value={expend} precision={2} />
      )}
    </>
  );
};

export default DayRender;
