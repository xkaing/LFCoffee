import React, { useContext } from "react";
import {
  Avatar,
  List,
  Tag,
  Space,
  Statistic,
  Typography,
  Flex,
  QRCode,
} from "antd";
import NameTag from "./NameTag";
import {
  createFromIconfontCN,
  CloseOutlined,
  ExclamationCircleOutlined,
  WarningFilled,
  WechatOutlined,
} from "@ant-design/icons";
import Decimal from "decimal.js";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4431122_rut41t8545r.js",
});
const { Text } = Typography;

const DayDetailInfo = ({ waitDate, calDate }) => {
  const allData = useContext(CoffeeDataContext) || [];
  const coffeeData = allData.sourceDataArr;

  // 检查日期参数
  const dayDate = calDate ? calDate : `2024-` + waitDate;
  const itemData = coffeeData.find((item) => item.date === dayDate);

  let profitNum = 0;
  let averagePrice = 0;
  let warningInfo = "";
  const pricesDict = {}; // 价位字典
  const tempDict = {}; // 温度字典

  if (itemData && itemData.drinker_list) {
    // ** 校验订单金额
    let sum = itemData.drinker_list
      .reduce(
        (total, value) => total.plus(new Decimal(value.price)),
        new Decimal(0)
      )
      .toNumber();
    if (sum !== itemData.expend) {
      warningInfo = "计算订单总价：" + sum + "，实际支出：" + itemData.expend;
    }
    // **

    // 平均
    averagePrice = Decimal.div(itemData.expend, itemData.drinker_list.length)
      .toDP(3)
      .toNumber();
    // 利润
    if (itemData.expend) {
      profitNum = Decimal.sub(itemData.income, itemData.expend).toNumber();
    }

    itemData.drinker_list.forEach((product) => {
      // 检查参数
      let originalPrice = product.hasOwnProperty("original_price")
        ? product.original_price
        : null;
      let temp = product.hasOwnProperty("temperature")
        ? product.temperature
        : null;

      if (originalPrice !== null) {
        if (pricesDict[originalPrice]) {
          pricesDict[originalPrice].push(product.price); // 此价位添加杯数
        } else {
          pricesDict[originalPrice] = [product.price]; // 添加新价位
        }
      }

      if (temp !== null) {
        if (tempDict[temp]) {
          tempDict[temp]++;
        } else {
          tempDict[temp] = 1;
        }
      }
    });
  }

  return (
    <>
      <Space>
        买单日期: {itemData.date}
        <Tag bordered={false} color="processing">
          {itemData.week}
        </Tag>
        <p>买单人: {<NameTag payer={itemData.payer_name}></NameTag>}</p>
      </Space>
      <Space size={"large"}>
        {itemData.expend && (
          <>
            <Statistic
              title="收入 (CNY)"
              value={itemData.income}
              precision={2}
            />
            <Statistic
              title="支出 (CNY)"
              value={itemData.expend}
              precision={2}
            />
            <Statistic
              title="利润 (CNY)"
              value={profitNum}
              valueStyle={
                profitNum >= 0 ? { color: "#3f8600" } : { color: "#cf1322" }
              }
              precision={2}
            />
            <Statistic title="均价 (CNY)" value={averagePrice} precision={3} />
          </>
        )}
      </Space>
      <TempDictComponent tempDict={tempDict} />
      <PricesDictComponent pricesDict={pricesDict} />
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={itemData.drinker_list}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar size="large" shape="square" src={item.drinker_url} />
              }
              title={<NameTag payer={item.drinker_name}></NameTag>}
              description={
                <Space size={"small"}>
                  {/* 2.温度 */}
                  {item.temperature === 1 ? (
                    <IconFont type="icon-coffee-cup" />
                  ) : (
                    <IconFont type="icon-coffee-cold1" />
                  )}
                  {/* 3.名称 */}
                  <Text>{item.name}</Text>
                  {/* 4.价格 */}
                  <Text type="danger">
                    <Text
                      type="danger"
                      style={{
                        fontSize: "0.8em",
                      }}
                    >
                      ¥
                    </Text>
                    {item.price}
                  </Text>
                  {/* 5.原价 */}
                  {item.original_price && (
                    <Text
                      delete
                      style={{
                        fontSize: "0.8em",
                      }}
                    >
                      ¥{item.original_price}
                    </Text>
                  )}
                </Space>
              }
            />
          </List.Item>
        )}
      />
      {/* 金额校验提示 */}
      {warningInfo && (
        <Flex justify="flex-end" gap="small" style={{ color: "#ff4d4f" }}>
          <WarningFilled />
          <Text style={{ fontSize: "0.9em", color: "#ff7a45" }}>
            {warningInfo}
          </Text>
        </Flex>
      )}
      {/* 收款码 */}
      {waitDate && itemData.income == 0 && (
        <Space
          direction="vertical"
          align="center"
          style={{ width: "100%", marginTop: "24px" }}
          size="small"
        >
          <Tag icon={<WechatOutlined />} color="#87d068">
            微信支付
          </Tag>
          <QRCode
            errorLevel="H"
            value="wxp://f2f05hGRGz8C4e0p61mXhEWN2jZ-4x9taM8Hl7vgtxOEJFo"
            size={250}
            iconSize={250 / 4}
            bordered={false}
            color="#87d068"
            bgColor="#f6ffed"
            icon="https://www.lfcoffee.cn/coffee_2.svg"
          />
        </Space>
      )}
    </>
  );
};

// 价位tag组件
const PricesDictComponent = ({ pricesDict }) => {
  const priceEntries = Object.entries(pricesDict); // 将对象转换为 [key, value] 形式的数组
  return (
    <Space
      size={"small"}
      style={{
        marginTop: "0.5em",
        marginBottom: "1em",
      }}
      wrap
    >
      {priceEntries.map(([key, prices], index) => (
        <Tag key={index} bordered={false}>
          <Text type="danger">
            <Text
              type="danger"
              style={{
                fontSize: "0.8em",
              }}
            >
              ¥
            </Text>
            {prices[0]}
          </Text>
          <Text
            delete
            style={{
              fontSize: "1em",
              marginLeft: "3px",
            }}
          >
            ¥{key}
          </Text>
          <CloseOutlined />
          <Text
            style={{
              fontSize: "1.3em",
            }}
          >
            {prices.length}
          </Text>
        </Tag>
      ))}
    </Space>
  );
};

// 温度tag组件
const TempDictComponent = ({ tempDict }) => {
  const tempEntries = Object.entries(tempDict);
  return (
    <Space
      size={"small"}
      style={{
        marginTop: "0.5em",
        marginBottom: "0.5em",
        marginRight: "0.5em",
      }}
    >
      {tempEntries.map(([key, value], index) => (
        <Tag key={index} bordered={false}>
          {key == 1 ? (
            <IconFont
              type="icon-coffee-cup"
              style={{
                fontSize: "1.3em",
              }}
            />
          ) : (
            <IconFont
              type="icon-coffee-cold1"
              style={{
                fontSize: "1.3em",
              }}
            />
          )}
          <CloseOutlined />
          <Text
            style={{
              fontSize: "1.3em",
            }}
          >
            {value}
          </Text>
        </Tag>
      ))}
    </Space>
  );
};

export default DayDetailInfo;
