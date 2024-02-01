import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "antd";
import axios from "axios";
import TagRender from "./TagRender";
import DayDetail from "./DayDetail";

const defaultData = [{ date: "2024-02-01", payer: "fe" }];

const CoffeeCalendar = () => {
  const [coffeeData, setCoffeeData] = useState(defaultData);
  const [selectedDate, setSelectedDate] = useState(null); // 存储选中的日期
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示

  useEffect(() => {
    const getCoffeeData = async () => {
      try {
        const response = await axios.get("/coffee.json");
        setCoffeeData(response.data);
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      }
    };
    getCoffeeData();
  }, []);

  const onChange = useCallback((value) => {
    console.log(value.format("YYYY-MM-DD"));
    setSelectedDate(value); // 设置选中的日期
    setIsModalVisible(true); // 显示模态框
  }, []);

  const dateCellRender = (value) => {
    const calendarData = coffeeData.find(
      (item) => item.date === value.format("YYYY-MM-DD")
    );
    return calendarData ? <TagRender {...calendarData} /> : null;
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
          date={selectedDate}
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
};

export default CoffeeCalendar;