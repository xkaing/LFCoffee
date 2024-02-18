import React from "react";
import { Col, Row, Typography } from "antd";
import { getCoffeeData } from "../serve";
import { useLoaderData } from "react-router-dom";
import TopCupsColumn from "./TopCupsColumn";
import TopDrinkerBar from "./TopDrinkerBar";
import RatioPricePie from "./RatioPricePie";
import RatioTempPie from "./RatioTempPie";

const { Title } = Typography;

export async function loader() {
  const sourceData = await getCoffeeData();
  return { sourceData };
}

const tempeMapping = { 0: "冰", 1: "热" };
const priceMapping = {
  23: "CNY: 23",
  29: "CNY: 29",
  32: "CNY: 32",
  35: "CNY: 35",
  38: "CNY: 38",
};

const Welcome = () => {
  const { sourceData } = useLoaderData();
  let totalCupsArray = []; //所有杯详情
  let topCups = {}; //最常喝的咖啡
  let topDrinker = {}; //最常购买者
  let ratioTemp = {}; //温度占比
  let ratioPrice = {}; //价位占比

  //遍历出所有咖啡
  sourceData.forEach((item) => {
    if (item.drinker_list) {
      item.drinker_list.forEach((item) => {
        totalCupsArray.push(item);
      });
    }
  });

  // 遍历出top数据
  totalCupsArray.forEach((drink) => {
    // 喝的最多的咖啡
    if (topCups[drink.name]) {
      topCups[drink.name]++;
    } else {
      topCups[drink.name] = 1;
    }
    // 喝的最多的人
    if (topDrinker[drink.drinker]) {
      topDrinker[drink.drinker]++;
    } else {
      topDrinker[drink.drinker] = 1;
    }
    // 温度
    if (ratioTemp[drink.temperature]) {
      ratioTemp[drink.temperature]++;
    } else {
      ratioTemp[drink.temperature] = 1;
    }
    // 价位
    if (ratioPrice[drink.original_price]) {
      ratioPrice[drink.original_price]++;
    } else {
      ratioPrice[drink.original_price] = 1;
    }
  });
  // 对象转数组
  const topCupsArr = Object.entries(topCups).map(([name, count]) => ({
    name,
    count,
  }));
  const topDrinkerArr = Object.entries(topDrinker).map(([drinker, count]) => ({
    drinker,
    count,
  }));
  const ratioTempArr = Object.entries(ratioTemp).map(([key, count]) => ({
    name: tempeMapping[key],
    count,
  }));
  const ratioPriceArr = Object.entries(ratioPrice).map(([key, count]) => ({
    name: priceMapping[key],
    count,
  }));
  topCupsArr.sort((a, b) => a.count - b.count); //升序
  topDrinkerArr.sort((a, b) => b.count - a.count); //降序

  return (
    <>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        Top Data
      </Title>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <TopDrinkerBar arr={topDrinkerArr} />
        </Col>
        <Col span={12}>
          <TopCupsColumn arr={topCupsArr} />
        </Col>
      </Row>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        Radtio Data
      </Title>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <RatioTempPie data={ratioTempArr} />
        </Col>
        <Col span={12}>
          <RatioPricePie arr={ratioPriceArr} />
        </Col>
      </Row>
    </>
  );
};
export default Welcome;
