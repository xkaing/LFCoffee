import React, { useState, useContext } from "react";
import { Card, Col, Row, Statistic, Modal, Typography, Flex } from "antd";
import CountUp from "react-countup";
import { TotalInfoContext } from "../contexts/CoffeeDataContext";
import PersonIncome from "../Charts/PersonIncome";
import { CoffeeNameNumWordCloud } from "../Charts/CoffeeNameNum";
import DateIE from "../Charts/DateIE";
import TotalExpendWaiting from "../components/TotalExpendWaiting";

const { Title } = Typography;

// 设置数值动画
const formatter = (value) => {
  const start = Math.floor(value / 100) * 100;
  const decimals = Number.isInteger(value) ? 0 : 2;
  return <CountUp start={start} end={value} decimals={decimals} />;
};
const formatterAverage = (value) => {
  const start = Math.floor(value / 100) * 100;
  return <CountUp start={start} end={value} decimals={3} />;
};

const TotalDataCard = () => {
  const totalInfo = useContext(TotalInfoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!totalInfo) {
    return <div>Loading...</div>;
  }

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
      <Flex justify="flex-start" align="center">
        <Col span={3}>
          <Title
            level={3}
            style={{
              marginTop: 12,
            }}
          >
            当前排期：
          </Title>
        </Col>
        <Col span={21}>
          <TotalExpendWaiting />
        </Col>
      </Flex>
      <Title
        level={3}
        style={{
          marginTop: 12,
        }}
      >
        总体数据
      </Title>
      <Row gutter={16}>
        <Col span={3}>
          <Card bordered={false} hoverable size="small" onClick={showModal}>
            <Statistic
              title="总收入 (CNY)"
              value={totalInfo.totalIncome}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable onClick={showModal}>
            <Statistic
              title="总支出 (CNY)"
              value={totalInfo.totalExpend}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable onClick={showModal}>
            <Statistic
              title="总利润 (CNY)"
              value={totalInfo.totalProfit}
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
              title="总杯数 (Cups)"
              value={totalInfo.totalCupsNum}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="均价 (CNY)"
              value={totalInfo.totalAverage}
              formatter={formatterAverage}
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
          <DateIE />
        </Col>
      </Row>
      {/* <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={24}>
          <CoffeeNameNumWordCloud />
        </Col>
      </Row> */}
      <Modal
        title="总体支出"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PersonIncome />
      </Modal>
    </>
  );
};
export default TotalDataCard;
