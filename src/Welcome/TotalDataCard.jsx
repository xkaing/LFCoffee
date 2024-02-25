import React, { useState, useContext } from "react";
import { Card, Col, Row, Statistic, Modal, Typography } from "antd";
import CountUp from "react-countup";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext";
import PersonIncome from "../Charts/PersonIncome";

const { Title } = Typography;

// 设置数值动画
const formatter = (value) => {
  const start = Math.floor(value / 100) * 100;
  const decimals = Number.isInteger(value) ? 0 : 2;
  return <CountUp start={start} end={value} decimals={decimals} />;
};

const TotalDataCard = () => {
  const coffeeData = useContext(CoffeeDataContext);
  const totalInfo = coffeeData.totalInfo;

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
              value={totalInfo.totalIncome}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable onClick={showModal}>
            <Statistic
              title="Expend (CNY)"
              value={totalInfo.totalExpend}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable onClick={showModal}>
            <Statistic
              title="Profit (CNY)"
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
              title="Coffee (Cups)"
              value={totalInfo.totalCupsNum}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="Average (CNY)"
              value={totalInfo.totalAverage}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title="TopPresonIncome"
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
