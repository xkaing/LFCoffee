import React from "react";
import { Modal, Avatar, List, Tag, Space, Statistic, Typography } from "antd";
import NameTag from "../components/NameTag";
import {
  createFromIconfontCN,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/c/font_4431122_rut41t8545r.js",
    //icon-Send-Money icon-coffee-cold1 icon-coffee-cup icon-coffee-cold icon-Coffee
  ],
});
const { Text } = Typography;

import Android1Url from "../assets/avatar/android-1.JPG";
import Android2Url from "../assets/avatar/android-2.JPG";
import Android3Url from "../assets/avatar/android-3.JPG";
import IOS1Url from "../assets/avatar/ios-1.JPG";
import IOS2Url from "../assets/avatar/ios-2.JPG";
import IOS3Url from "../assets/avatar/ios-3.JPG";
import Fe1Url from "../assets/avatar/fe-1.JPG";

const DayDetail = ({ data, date, visible, onClose }) => {
  const itemData = data.find((item) => item.date === date.format("YYYY-MM-DD"));
  let profitNum = 0;
  let averagePrice = 0;
  const pricesDict = {}; // 价位字典
  const tempDict = {}; // 温度字典

  if (itemData && itemData.drinker_list) {
    // 总价
    let sum = itemData.drinker_list.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    sum = sum.toFixed(2);
    // 校验订单总价和支出
    if (sum != itemData.expend) {
      console.log("计算出的订单总价：" + sum + "实际支出：" + itemData.expend);
    }
    // 平均
    averagePrice = sum / itemData.drinker_list.length;
    // 利润
    if (itemData.income && itemData.expend) {
      profitNum = itemData.income - itemData.expend;
      profitNum = profitNum.toFixed(2);
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
              Selected date: {date.format("YYYY-MM-DD")}
              <Tag bordered={false} color="processing">
                {itemData.week}
              </Tag>
              <p>Payer: {<NameTag payer={itemData.payer}></NameTag>}</p>
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
                    precision={2}
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
                    // avatar={<Avatar size="large" shape="square" src={Fe1Url} />}
                    avatar={<AvatarDrinker drinker={item.drinker} />}
                    title={<NameTag payer={item.drinker}></NameTag>}
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

const avatarUrls2 = {
  "android-1": Android1Url,
  "android-2": Android2Url,
  "android-3": Android3Url,
  "ios-1": IOS1Url,
  "ios-2": IOS2Url,
  "ios-3": IOS3Url,
  "fe-1": Fe1Url,
  姜振: Android1Url,
  刘磊: Android2Url,
  李泽晋: Android3Url,
  汪潇翔: IOS1Url,
  周洋: IOS2Url,
  曹海洋: IOS3Url,
  汪潇凯: Fe1Url,
};
const AvatarDrinker = ({ drinker }) => {
  let url = avatarUrls2[drinker] || "";
  return <Avatar size="large" shape="square" src={url} />;
};

export default DayDetail;
