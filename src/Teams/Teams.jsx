import React from "react";
import { Col, Row, Typography } from "antd";
import { getCoffeeData } from "../serve";
import { useLoaderData } from "react-router-dom";
import TopCupsColumn from "./TopCupsColumn";
import TopDrinkerBar from "./TopDrinkerBar";

const { Title } = Typography;

export async function loader() {
  const sourceData = await getCoffeeData();
  return { sourceData };
}

const Welcome = () => {
  const { sourceData } = useLoaderData();
  let totalCupsArray = []; //所有杯详情
  let topCups = {}; //最常喝的咖啡
  let topDrinker = {}; //最常购买者

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
    if (topCups[drink.name]) {
      topCups[drink.name]++;
    } else {
      topCups[drink.name] = 1;
    }
    if (topDrinker[drink.drinker]) {
      topDrinker[drink.drinker]++;
    } else {
      topDrinker[drink.drinker] = 1;
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
    </>
  );
};
export default Welcome;
