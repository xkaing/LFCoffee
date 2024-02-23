import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "antd";
import axios from "axios";
import DayRender from "./DayRender";
import DayDetail from "./DayDetail";
import { markBecomeName } from "../tools";

const defaultData = [{ date: "2024-02-01", payer: "fe" }];

const CoffeeCalendar = () => {
  const [coffeeData, setCoffeeData] = useState(defaultData); // 咖啡购买数据
  const [selectedDate, setSelectedDate] = useState(null); // 存储选中的日期
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示

  // 请求接口
  useEffect(() => {
    const getCoffeeData = async () => {
      try {
        const response = await axios.get("/coffee.json");
        setCoffeeData(markBecomeName(response.data));
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      }
    };
    getCoffeeData();
  }, []);

  // 日历点击事件
  const onChange = useCallback((value) => {
    setSelectedDate(value); // 设置选中的日期
    setIsModalVisible(true); // 显示模态框
  }, []);

  // 渲染单元格内容
  const dateCellRender = (value) => {
    const calendarData = coffeeData.find(
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
      {selectedDate && (
        <DayDetail
          data={coffeeData}
          date={selectedDate}
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
};

export default CoffeeCalendar;
