import React, { useState, useContext } from "react";
import { AllCupsContext } from "../contexts/CoffeeDataContext";
import OneDatePrice from "../Charts/OneDatePrice.jsx";
import { PersonDataContext } from "../contexts/CoffeeDataContext";
import Decimal from "decimal.js";
import CountUp from "react-countup";
import {
  Col,
  Row,
  Statistic,
  Card,
  Flex,
  Space,
  Badge,
  Tooltip,
  Typography,
} from "antd";
import { WarningFilled } from "@ant-design/icons";
import {
  OneCoffeeNameNumColumn,
  OneCoffeeNameNumPie,
} from "../Charts/OneCoffeeNameNum.jsx";

const { Title } = Typography;

const formatterAverage = (value) => {
  const start = Math.floor(value / 100) * 100;
  return <CountUp start={start} end={value} decimals={2} />;
};
const formatterCups = (value) => {
  return <CountUp end={value} decimals={0} />;
};

const PersonDetail = ({ drinker }) => {
  const contextData = useContext(AllCupsContext) || [];
  const personContextData = useContext(PersonDataContext) || {};

  // 计算-图表数据
  const drinkerData = contextData.filter((obj) => obj.drinker === drinker);
  const drinkerCoffeeNameNum = []; // 个人口味记录
  const chartData = drinkerData
    .map((item) => {
      drinkerCoffeeNameNum[item.name] = drinkerCoffeeNameNum[item.name]
        ? drinkerCoffeeNameNum[item.name] + 1
        : 1;
      return { ...item, date: item.date.slice(5) };
    })
    .reverse();

  // 计算-消费总计
  const drinkerConsumption = drinkerData
    .reduce(
      (total, value) => total.plus(new Decimal(value.price)),
      new Decimal(0)
    )
    .toNumber();

  // 计算-支出总计
  const personIncome = personContextData.personIncome;
  const payerData = personIncome[drinker];
  const drinkerDebit = payerData
    .reduce((total, value) => total.plus(new Decimal(value)), new Decimal(0))
    .toNumber();
  // 计算-个人差额
  const drinkerProfit = Decimal.sub(
    drinkerConsumption,
    drinkerDebit
  ).toNumber();

  // 计算-单杯消费平均
  const oneCupAverage = Decimal.div(drinkerConsumption, drinkerData.length)
    .toDP(3)
    .toNumber();
  // 计算-单次支出平均
  const oneExpendAverage = Decimal.div(drinkerDebit, payerData.length)
    .toDP(3)
    .toNumber();

  return (
    <>
      <Flex gap="large" align="center" justify="space-between">
        <Card size="small" hoverable>
          <Statistic
            title="一共喝了(Cups)"
            value={drinkerData.length}
            formatter={formatterCups}
          />
        </Card>
        <Card hoverable size="small">
          <Statistic
            title="消费总计(CNY)"
            value={drinkerConsumption}
            formatter={formatterAverage}
          />
        </Card>
        <Card hoverable size="small">
          <Statistic
            title="单杯平均(CNY)"
            value={oneCupAverage}
            formatter={formatterAverage}
          />
        </Card>
        <Card size="small" hoverable>
          <Statistic
            title="一共买单(Num)"
            value={payerData.length}
            formatter={formatterCups}
          />
        </Card>
        <Card size="small" hoverable>
          <Statistic
            title="支出总计(CNY)"
            value={drinkerDebit}
            formatter={formatterAverage}
          />
        </Card>
        <Card hoverable size="small">
          <Statistic
            title="每单平均(CNY)"
            value={oneExpendAverage}
            formatter={formatterAverage}
          />
        </Card>
        <Card size="small" hoverable>
          <Statistic
            title="差额总计(CNY)"
            value={drinkerProfit}
            formatter={formatterAverage}
          />
        </Card>
      </Flex>
      <Flex
        gap="large"
        align="center"
        justify="space-evenly"
        style={{ width: "100%" }}
      >
        <div>
          <Title
            level={3}
            style={{
              marginTop: 12,
            }}
          >
            消费记录
          </Title>
          <OneDatePrice data={chartData} />
        </div>
        <div>
          <Title
            level={3}
            style={{
              marginTop: 12,
            }}
          >
            口味习惯
          </Title>
          <OneCoffeeNameNumColumn obj={drinkerCoffeeNameNum} />
        </div>
      </Flex>
    </>
  );
};

export default PersonDetail;
