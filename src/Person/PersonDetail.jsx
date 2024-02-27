import React, { useState, useContext } from "react";
import { AllCupsContext } from "../contexts/CoffeeDataContext";
import OneDatePrice from "../Charts/OneDatePrice.jsx";
import { PersonDataContext } from "../contexts/CoffeeDataContext";
import Decimal from "decimal.js";
import CountUp from "react-countup";
import { Col, Row, Statistic, Card, Flex, Space, Badge, Tooltip } from "antd";
import { WarningFilled } from "@ant-design/icons";

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
  const chartData = drinkerData
    .map((item) => ({ ...item, date: item.date.slice(5) }))
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

  return (
    <>
      <Flex
        gap="large"
        align="center"
        justify="space-evenly"
        style={{ width: "100%" }}
      >
        <OneDatePrice data={chartData} />
        <Flex gap="small" align="center" justify="space-between" vertical>
          <Space>
            <Card hoverable size="small">
              <Statistic
                title="消费总计(CNY)"
                value={drinkerConsumption}
                formatter={formatterAverage}
              />
            </Card>
            <Card size="small" hoverable>
              <Statistic
                title="一共喝了(Cups)"
                value={drinkerData.length}
                formatter={formatterCups}
              />
            </Card>
          </Space>
          <Tooltip
            title="少导入一次买单数据"
            placement="right"
            color="#f5222d"
            open={drinker === "ios-2" || drinker === "android-3"}
          >
            <Space>
              <Badge
                count={
                  drinker === "ios-2" || drinker === "android-3" ? (
                    <WarningFilled
                      style={{
                        color: "#f5222d",
                      }}
                    />
                  ) : (
                    0
                  )
                }
              >
                <Card size="small" hoverable>
                  <Statistic
                    title="支出总计(CNY)"
                    value={drinkerDebit}
                    formatter={formatterAverage}
                  />
                </Card>
              </Badge>
              <Badge
                count={
                  drinker === "ios-2" || drinker === "android-3" ? (
                    <WarningFilled
                      style={{
                        color: "#f5222d",
                      }}
                    />
                  ) : (
                    0
                  )
                }
              >
                <Card size="small" hoverable>
                  <Statistic
                    title="一共买单(Num)"
                    value={payerData.length}
                    formatter={formatterCups}
                  />
                </Card>
              </Badge>
            </Space>
          </Tooltip>
          <Badge
            count={
              drinker === "ios-2" || drinker === "android-3" ? (
                <WarningFilled
                  style={{
                    color: "#f5222d",
                  }}
                />
              ) : (
                0
              )
            }
          >
            <Card size="small" hoverable>
              <Statistic
                title="差额总计(CNY)"
                value={drinkerProfit}
                formatter={formatterAverage}
              />
            </Card>
          </Badge>
        </Flex>
      </Flex>
    </>
  );
};

export default PersonDetail;
