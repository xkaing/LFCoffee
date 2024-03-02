import React, { useContext } from "react";
import { Steps } from "antd";
import { TotalInfoContext } from "../contexts/CoffeeDataContext";

const TotalExpendWaiting = () => {
  const totalWaiting = useContext(TotalInfoContext).totalWaiting || [];
  console.log(totalWaiting);
  const titleArr = totalWaiting[4].map((title) => ({ title }));
  return <Steps size="small" current={0} items={titleArr} />;
};
export default TotalExpendWaiting;
