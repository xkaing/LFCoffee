import React from "react";
import { Calendar, Tag } from "antd";
import { AndroidFilled, AppleFilled, ChromeFilled } from "@ant-design/icons";
import axios from "axios";

let sourceData;

const getCoffeeData = async () => {
  try {
    const response = await axios.get("/coffee.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    return [];
  }
};
getCoffeeData().then((data) => {
  console.log("Coffee data:", data);
  sourceData = data;
});

// 获取日历数据
const getData = (value) => {
  let matchedData = sourceData.find(
    (item) => item.date === value.format("YYYY-MM-DD")
  );
  return matchedData || {};
};

// 日期点击事件
const onChange = (value) => {
  console.log(value.format("YYYY-MM-DD"));
};

// 渲染日历
const CoffeeCalendar = () => {
  // 渲染每一天
  const dateCellRender = (value) => {
    const calendarData = getData(value);
    return (
      <>
        {Object.keys(calendarData).length ? (
          <TagRender {...calendarData} />
        ) : null}
      </>
    );
  };

  // 自定义Tag
  const TagRender = (data) => {
    let TagName = null;
    let TagColor = null;
    const lowerPayer = data.payer.toLowerCase();
    if (lowerPayer.includes("android")) {
      TagName = <AndroidFilled />;
      TagColor = "#87d068";
    } else if (lowerPayer.includes("ios")) {
      TagName = <AppleFilled />;
      TagColor = "#2db7f5";
    } else if (lowerPayer.includes("fe")) {
      TagName = <ChromeFilled />;
      TagColor = "#f50";
    }
    return (
      <Tag icon={TagName} color={TagColor}>
        {data.payer}
      </Tag>
    );
  };

  // 渲染单元格
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} onChange={onChange} />;
};

export default CoffeeCalendar;