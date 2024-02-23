import React from "react";
import { Col, Row, Typography } from "antd";
import { getCoffeeData } from "../serve";
import { useLoaderData } from "react-router-dom";
import TopCupsColumn from "./TopCupsColumn";
import TopDrinkerBar from "./TopDrinkerBar";
import RatioPricePie from "./RatioPricePie";
import RatioTempPie from "./RatioTempPie";
import TopProfit from "./TopProfit";
import TopDateAverage from "./TopDateAverage";

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
  let topProfit = {}; //利润曲线
  let topAverage = {}; //平均价格曲线
  let lineDatePrice = []; //日期价格曲线

  //遍历出所有咖啡
  sourceData.forEach((item) => {
    if (item.income && item.expend) {
      topProfit[item.date] = item.income - item.expend;
    }
    if (item.drinker_list) {
      item.drinker_list.forEach((item) => {
        totalCupsArray.push(item);
      });
      topAverage[item.date] = item.expend / item.drinker_list.length;
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
  const topProfitArr = Object.entries(topProfit).map(([date, value]) => ({
    date: date.substring(5),
    value: parseFloat(value.toFixed(2)),
  }));
  const topAverageArr = Object.entries(topAverage).map(([date, value]) => ({
    date: date.substring(5),
    value: parseFloat(value.toFixed(2)),
  }));

  topCupsArr.sort((a, b) => a.count - b.count); //升序
  topDrinkerArr.sort((a, b) => b.count - a.count); //降序
  topProfitArr.reverse(); //倒序
  topAverageArr.reverse();

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
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        Price Data
      </Title>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <TopProfit data={topProfitArr} />
        </Col>
        <Col span={12}>
          <TopDateAverage data={topAverageArr} />
        </Col>
      </Row>
    </>
  );
};
export default Welcome;
