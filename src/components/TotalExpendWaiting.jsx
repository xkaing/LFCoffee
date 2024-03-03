import React, { useContext } from "react";
import { Steps } from "antd";
import { TotalInfoContext } from "../contexts/CoffeeDataContext";
import { addNameInSteps } from "../tools";

const TotalExpendWaiting = () => {
  const totalWaiting = useContext(TotalInfoContext).totalWaiting || [];

  const allPersonArr = addNameInSteps(totalWaiting[1]); // 排期模版（所有成员）

  const lastWaiting = totalWaiting.at(-1); // 当前排期
  const currentIndex = allPersonArr.findIndex(
    (person) => person.payer === lastWaiting.at(-1)
  ); // 当前排期位置

  return <Steps current={currentIndex + 1} items={allPersonArr} />;
};
export default TotalExpendWaiting;
