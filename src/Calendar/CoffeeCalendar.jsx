import React, { useState, useCallback, useContext } from "react";
import { Calendar, Statistic, Modal } from "antd";
import NameTag from "../components/NameTag";
import DayDetailInfo from "../components/DayDetailInfo";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext";

const CoffeeCalendar = () => {
  const contextData = useContext(CoffeeDataContext);
  const coffeeData2 = contextData ? contextData.sourceDataArr : [];
  const [selectedDate, setSelectedDate] = useState(null); // 存储选中的日期
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示

  // 日历点击事件
  const onChange = useCallback((value) => {
    const date = value.format("YYYY-MM-DD");
    const calendarData = coffeeData2.find((item) => item.date === date);
    if (!calendarData) return;
    setSelectedDate(date); // 设置选中的日期详情况
    setIsModalVisible(true); // 显示模态框
  }, []);

  // 渲染单元格内容
  const dateCellRender = (value) => {
    const calendarData = coffeeData2.find(
      (item) => item.date === value.format("YYYY-MM-DD")
    );
    return calendarData ? <DayRender {...calendarData} /> : null;
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar cellRender={cellRender} onChange={onChange} />
      <Modal
        title="订单详情"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={430}
      >
        <DayDetailInfo calDate={selectedDate} />
      </Modal>
    </>
  );
};

export default CoffeeCalendar;

// 日历-单元格渲染
const DayRender = ({ payer_name, income, expend }) => (
  <>
    <NameTag payer={payer_name}></NameTag>
    {/* {income - expend && (
      <Statistic title="利润 (CNY)" value={income - expend} precision={2} />
    )} */}
    {expend && <Statistic title="支出 (CNY)" value={expend} precision={2} />}
  </>
);
