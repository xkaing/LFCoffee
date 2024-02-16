import React from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import CountUp from "react-countup";
import { getCoffeeData } from "../serve";
import { useLoaderData } from "react-router-dom";
import ChartColumnAllCups from "./ChartColumnTeamCups";
import PlotsPieTeamCups from "../Chart/PlotsPieTeamCups";
import ChartWordCloudTeamCups from "./ChartWordCloudTeamCups";

const { Title } = Typography;
const formatter = (value) => {
  const start = Math.floor(value / 100) * 100;
  const decimals = Number.isInteger(value) ? 0 : 2;
  return <CountUp start={start} end={value} decimals={decimals} />;
};

export async function loader() {
  const sourceData = await getCoffeeData();
  return { sourceData };
}

const Welcome = () => {
  const { sourceData } = useLoaderData();
  let totalIncome = 0; //总收入
  let totalExpend = 0; //总支出
  let totalProfit = 0; //总利润
  let totalAverage = 0; //总平均价格
  let totalCupsArray = []; //所有杯详情
  let totalNameCounts = {}; //所有名字数量

  sourceData.forEach((item) => {
    if (item.income && item.expend) {
      totalIncome += item.income;
      totalExpend += item.expend;
    }
    if (item.drinker_list) {
      item.drinker_list.forEach((item) => {
        totalCupsArray.push(item);
      });
    }
  });
  totalProfit = totalIncome - totalExpend;
  totalAverage = totalExpend / totalCupsArray.length;

  // 统计所有咖啡的数量
  totalCupsArray.forEach((drink) => {
    if (totalNameCounts[drink.name]) {
      totalNameCounts[drink.name]++;
    } else {
      totalNameCounts[drink.name] = 1;
    }
  });
  // 对象转数组
  const nameCountsArray = Object.entries(totalNameCounts).map(
    ([name, count]) => ({
      name,
      count,
    })
  );
  const typeValueArray = Object.entries(totalNameCounts).map(
    ([type, value]) => ({
      type,
      value,
    })
  );

  nameCountsArray.sort((a, b) => a.count - b.count); //数组升序排序
  return (
    <>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        TotalData
      </Title>
      <Row gutter={16}>
        <Col span={3}>
          <Card bordered={false} hoverable size="small">
            <Statistic
              title="Income (CNY)"
              value={totalIncome}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="Expend (CNY)"
              value={totalExpend}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="Profit (CNY)"
              value={totalProfit}
              formatter={formatter}
              valueStyle={{
                color: "green",
              }}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="Coffee (Cups)"
              value={totalCupsArray.length}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="Average (CNY)"
              value={totalAverage}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={24}>
          <ChartColumnAllCups arr={nameCountsArray} />
        </Col>
      </Row>
      {/* <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={24}>
          <ChartWordCloudTeamCups arr={nameCountsArray} />
        </Col>
      </Row> */}
    </>
  );
};
export default Welcome;
