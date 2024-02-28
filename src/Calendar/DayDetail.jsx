import React from "react";
import { Modal, Avatar, List, Tag, Space, Statistic, Typography } from "antd";
import NameTag from "../components/NameTag";
import { createFromIconfontCN, CloseOutlined } from "@ant-design/icons";
import Decimal from "decimal.js";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4431122_rut41t8545r.js",
});
const { Text } = Typography;

const DayDetail = ({ itemData, visible, onClose }) => {
  let profitNum = 0;
  let averagePrice = 0;
  const pricesDict = {}; // 价位字典
  const tempDict = {}; // 温度字典

  if (itemData && itemData.drinker_list) {
    // 总价
    // let sum = itemData.drinker_list.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue.price,
    //   0
    // );
    // sum = sum.toFixed(2);
    // 校验订单总价和支出
    // if (sum != itemData.expend) {
    //   console.log("计算出的订单总价：" + sum + "实际支出：" + itemData.expend);
    // }

    // 平均
    averagePrice = Decimal.div(itemData.expend, itemData.drinker_list.length)
      .toDP(3)
      .toNumber();
    // 利润
    if (itemData.income && itemData.expend) {
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
      <Modal
        title="Day Detail"
        open={visible}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        {itemData && (
          <>
            <Space>
              Selected date: {itemData.date}
              <Tag bordered={false} color="processing">
                {itemData.week}
              </Tag>
              <p>Payer: {<NameTag payer={itemData.payer_name}></NameTag>}</p>
            </Space>
            <Space size={"large"}>
              {itemData.expend && (
                <>
                  <Statistic
                    title="Income (CNY)"
                    value={itemData.income}
                    precision={2}
                  />
                  <Statistic
                    title="Expend (CNY)"
                    value={itemData.expend}
                    precision={2}
                  />
                  <Statistic
                    title="Profit (CNY)"
                    value={profitNum}
                    valueStyle={
                      profitNum >= 0
                        ? { color: "#3f8600" }
                        : { color: "#cf1322" }
                    }
                    precision={2}
                  />
                  <Statistic
                    title="Average (CNY)"
                    value={averagePrice}
                    precision={3}
                  />
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
                      <Avatar
                        size="large"
                        shape="square"
                        src={item.drinker_url}
                      />
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
          </>
        )}
        {!itemData && <p>No data</p>}
      </Modal>
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

export default DayDetail;
