import React from "react";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { getCoffeeData } from "../serve";
import { useLoaderData } from "react-router-dom";
const { Title } = Typography;

export async function loader() {
  const sourceData = await getCoffeeData();
  return { sourceData };
}

const Welcome = () => {
  const { sourceData } = useLoaderData();
  let totalIncome = 0; //总收入
  let totalExpend = 0; //总支出
  let totalProfit = 0; //总利润
  let totalCups = 0; // 总杯数
  let totalAverage = 0; //总平均价格

  sourceData.forEach((item) => {
    if (item.income && item.expend) {
      totalIncome += item.income;
      totalExpend += item.expend;
    }
    if (item.drinker_list) {
      totalCups += item.drinker_list.length;
    }
  });
  totalProfit = totalIncome - totalExpend;
  totalAverage = totalExpend / totalCups;
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
            <Statistic title="Income (CNY)" value={totalIncome} precision={2} />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic title="Expend (CNY)" value={totalExpend} precision={2} />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic title="Profit (CNY)" value={totalProfit} precision={2} />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic title="Coffee (Cups)" value={totalCups} precision={0} />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="Average (CNY)"
              value={totalAverage}
              precision={2}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Welcome;
