import React, { useState } from "react";
import { Card, Col, Row, Statistic, Typography, Modal } from "antd";
import CountUp from "react-countup";
import { getCoffeeData } from "../serve";
import { useLoaderData } from "react-router-dom";
import TopPresonProfit from "../Teams/TopPresonProfit";
import AllCoffeeWordCloud from "../Teams/AllCoffeeWordCloud";

const { Title } = Typography;

const toInt = (num) => {
  return parseFloat(num.toFixed(2));
};

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
  let topCups = {}; //最常喝的咖啡
  let topPersonProfit = {}; // 团队每人产生的利润

  sourceData.forEach((item) => {
    if (item.income && item.expend) {
      totalIncome += item.income;
      totalExpend += item.expend;

      if (topPersonProfit[item.payer]) {
        topPersonProfit[item.payer].push(toInt(item.income - item.expend));
      } else {
        topPersonProfit[item.payer] = [toInt(item.income - item.expend)];
      }
    }
    if (item.drinker_list) {
      item.drinker_list.forEach((item) => {
        totalCupsArray.push(item);
      });
    }
  });
  // console.log(topPersonProfit);

  totalProfit = totalIncome - totalExpend;
  totalAverage = totalExpend / totalCupsArray.length;
  // 遍历出top数据
  totalCupsArray.forEach((drink) => {
    // 喝的最多的咖啡
    if (topCups[drink.name]) {
      topCups[drink.name]++;
    } else {
      topCups[drink.name] = 1;
    }
  });
  const topCupsArr = Object.entries(topCups).map(([name, value]) => ({
    name,
    value,
  }));
  const topPersonProfitArr = Object.entries(topPersonProfit).map(
    ([name, value]) => ({
      name,
      value: toInt(value.reduce((a, b) => a + b, 0)),
    })
  );
  topPersonProfitArr.sort((a, b) => b.value - a.value); //降序
  // console.log(topPersonProfitArr);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          <Card bordered={false} size="small" hoverable onClick={showModal}>
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
      <Modal
        title="TopPresonProfit"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <TopPresonProfit data={topPersonProfitArr} />
      </Modal>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={22}>
          <AllCoffeeWordCloud data={topCupsArr} />
        </Col>
      </Row>
    </>
  );
};
export default Welcome;
