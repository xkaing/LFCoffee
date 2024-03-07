import React, { useContext, useState } from "react";
import { Steps, Typography, Space, Button, Drawer } from "antd";
import {
  TotalInfoContext,
  DateDataContext,
} from "../contexts/CoffeeDataContext";
import { addNameInSteps } from "../tools";
import DayDetailInfo from "./DayDetailInfo";
const { Text } = Typography;

const TotalExpendWaiting = () => {
  const totalWaiting = useContext(TotalInfoContext).totalWaiting || [];
  const dateData = useContext(DateDataContext) || {};

  // 排期模版（所有成员）
  const allPersonArr = addNameInSteps(totalWaiting[1]);

  // 当前排期已经买单的
  const lastWaiting = totalWaiting.at(-1);
  // 当前排期位置
  const currentIndex = allPersonArr.findIndex(
    (person) => person.payer === lastWaiting.at(-1)
  );
  // 买单的详情
  const lastWaitingFullInfo = dateData.slice(-lastWaiting.length);

  const allPersonArr2 = allPersonArr.map((person) => {
    const payerInfo = lastWaitingFullInfo.find(
      (info) => info.payer === person.payer
    );
    if (payerInfo) {
      return {
        payer: payerInfo.payer,
        title: payerInfo.name,
        description: <StepsDesc payerInfo={payerInfo} />,
      };
    } else {
      return person;
    }
  });

  return <Steps current={currentIndex + 1} items={allPersonArr2} />;
};

export default TotalExpendWaiting;

const StepsDesc = ({ payerInfo }) => {
  const [open, setOpen] = useState(false);
  const onShow = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Space direction="vertical" size={"small"}>
      <Text>日期：{payerInfo.date}</Text>
      <Text>杯数：{payerInfo.cups}</Text>
      <Text>均价：¥{payerInfo.average}</Text>
      <Button type="primary" size="small" ghost onClick={onShow}>
        详情
      </Button>
      <Drawer title="订单详情" onClose={onClose} open={open} width={430}>
        <DayDetailInfo waitDate={payerInfo.date} />
      </Drawer>
    </Space>
  );
};
