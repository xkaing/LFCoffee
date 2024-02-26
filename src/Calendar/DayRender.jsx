import React from "react";
import { Statistic } from "antd";
import NameTag from "../components/NameTag";

const DayRender = ({ payer_name, expend }) => {
  return (
    <>
      <NameTag payer={payer_name}></NameTag>
      {expend && (
        <Statistic title="Expend (CNY)" value={expend} precision={2} />
      )}
    </>
  );
};

export default DayRender;
