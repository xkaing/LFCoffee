import React from "react";
import { Col, Row, Typography } from "antd";
import { CoffeeNameNumColumn } from "../Charts/CoffeeNameNum";
import PersonCupsNum from "../Charts/PersonCupsNum";
import CoffeeTempNum from "../Charts/CoffeeTempNum";
import CoffeePriceNum from "../Charts/CoffeePriceNum";
import { CoffeeNameNumTreemap } from "../Charts/CoffeeNameNum";
// 日期价格图表
import DateProfit from "../Charts/DateProfit";
import DateAverage from "../Charts/DateAverage";
import DateIncome from "../Charts/DateIncome";
import DateExpend from "../Charts/DateExpend";
import DateIE from "../Charts/DateIE";
import DateCups from "../Charts/DateCups";

const { Title } = Typography;

const Teams = () => {
  return (
    <>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        喝的最多 ? 是 ?
      </Title>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <PersonCupsNum />
        </Col>
        <Col span={12}>
          <CoffeeNameNumColumn />
        </Col>
      </Row>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        咖啡比例图表
      </Title>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <CoffeeTempNum />
        </Col>
        <Col span={12}>
          <CoffeePriceNum />
        </Col>
      </Row>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        每日经济图表
      </Title>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <DateProfit />
        </Col>
        <Col span={12}>
          <DateAverage />
        </Col>
      </Row>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <DateIncome />
        </Col>
        <Col span={12}>
          <DateExpend />
        </Col>
      </Row>
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={12}>
          <DateCups />
        </Col>
        {/* <Col span={12}>
          <CoffeeNameNumTreemap />
        </Col> */}
      </Row>
    </>
  );
};
export default Teams;
