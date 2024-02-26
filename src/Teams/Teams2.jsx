import React from "react";
import { Col, Row, Typography } from "antd";
import { CoffeeNameNumColumn } from "../Charts/CoffeeNameNum";
import PersonCupsNum from "../Charts/PersonCupsNum";
import CoffeeTempNum from "../Charts/CoffeeTempNum";
import CoffeePriceNum from "../Charts/CoffeePriceNum";
import DateProfit from "../Charts/DateProfit";
import DateAverage from "../Charts/DateAverage";

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
        Top Data
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
        Radtio Data
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
        Price Data
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
    </>
  );
};
export default Teams;
