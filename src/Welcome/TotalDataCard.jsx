import React, { useState, useContext } from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Modal,
  Typography,
  Flex,
  Empty,
} from "antd";
import CountUp from "react-countup";
import { TotalInfoContext } from "../contexts/CoffeeDataContext";
import PersonIncome from "../Charts/PersonIncome";
import {
  CoffeeNameNumWordCloud,
  CoffeeNameNumTreemap,
} from "../Charts/CoffeeNameNum";
import DateIE from "../Charts/DateIE";
import TotalExpendWaiting from "../components/TotalExpendWaiting";
import DateAll from "../Charts/DateAll";
import PersonProfit from "../Charts/PersonProfit";

const { Title, Text } = Typography;

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
    return <Empty />;
  }
  const cicloInCorso = totalInfo.totalWaiting.length;

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
      <Row gutter={[16, 24]}>
        <Col span={3}>
          <Title
            level={3}
            style={{
              marginTop: 0,
            }}
          >
            当前周期：
          </Title>
          <Text type="secondary" style={{ fontSize: "1.2em" }}>
            （第{cicloInCorso}轮）
          </Text>
        </Col>
        <Col span={21}>
          <TotalExpendWaiting />
        </Col>
      </Row>
      <Row gutter={[16, 24]} style={{ marginTop: 12, marginBottom: 12 }}>
        <Col span={3}>
          <Title
            level={3}
            style={{
              marginTop: 12,
            }}
          >
            总体数据：
          </Title>
        </Col>
        <Col span={4}>
          <Card bordered={false} hoverable size="small">
            <Statistic
              title="总收入 (CNY)"
              value={totalInfo.totalIncome}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="总支出 (CNY)"
              value={totalInfo.totalExpend}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={4}>
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
        <Col span={4}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="总杯数 (Cups)"
              value={totalInfo.totalCupsNum}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false} size="small" hoverable>
            <Statistic
              title="均价 (CNY)"
              value={totalInfo.totalAverage}
              formatter={formatterAverage}
            />
          </Card>
        </Col>
      </Row>
      {/* 日期图 */}
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
      {/* 矩阵图 */}
      <Row
        gutter={16}
        style={{
          marginTop: 24,
        }}
      >
        <Col span={24}>
          <CoffeeNameNumTreemap />
        </Col>
      </Row>
      <Modal
        title="小费榜单"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PersonProfit />
      </Modal>
    </>
  );
};
export default TotalDataCard;
