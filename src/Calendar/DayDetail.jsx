import React from "react";
import { Modal, Avatar, List, Tag, Space, Statistic, Typography } from "antd";
import TagName from "./TagName";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/c/font_4431122_rut41t8545r.js",
    //icon-Send-Money icon-coffee-cold1 icon-coffee-cup icon-coffee-cold icon-Coffee
  ],
});
const { Text } = Typography;
import DetailListDesc from "./DayDetail/DetailListDesc";

const DayDetail = ({ data, date, visible, onClose }) => {
  const itemData = data.find((item) => item.date === date.format("YYYY-MM-DD"));
  let profitNum = 0;
  let averagePrice = 0;
  const pricesByOriginalPrice = {}; // 初始化一个空对象用来存储每个不同original_price的价格数组
  const tempDict = {};

  if (itemData && itemData.drinker_list) {
    // 总价
    let sum = itemData.drinker_list.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    sum = sum.toFixed(2);
    // 校验订单总价和支出
    if (sum != itemData.expend) {
      console.warn("订单总价：" + sum + " 支出：" + itemData.expend);
    }
    // 平均
    averagePrice = sum / itemData.drinker_list.length;
    // 利润
    if (itemData.income && itemData.expend) {
      profitNum = itemData.income - itemData.expend;
    }

    // 使用forEach遍历数组，收集每个original_price对应的所有价格
    itemData.drinker_list.forEach((product) => {
      // 检查original_price是否存在，如果不存在则设定默认值
      let originalPrice = product.hasOwnProperty("original_price")
        ? product.original_price
        : "undefined";
      let temp = product.hasOwnProperty("temperature")
        ? product.temperature
        : "undefined";

      // 如果这个原价已经在pricesByOriginalPrice对象中，就将当前商品的价格添加到数组中
      if (pricesByOriginalPrice[originalPrice]) {
        pricesByOriginalPrice[originalPrice].push(product.price);
      } else {
        // 如果这个原价还不在pricesByOriginalPrice对象中，就初始化一个数组并添加当前商品的价格
        pricesByOriginalPrice[originalPrice] = [product.price];
      }

      if (tempDict[temp]) {
        tempDict[temp]++;
      } else {
        tempDict[temp] = 1;
      }
    });

    // 输出每个不同original_price下的所有价格数组
    console.log(pricesByOriginalPrice);
    console.log(tempDict);
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
              <p>Payer: {<TagName payer={itemData.payer}></TagName>}</p>
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
            <ProductsComponent pricesByOriginalPrice={pricesByOriginalPrice} />
            <TempComponent tempDict={tempDict} />
            <List
              itemLayout="horizontal"
              size="small"
              dataSource={itemData.drinker_list}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<TagName payer={item.drinker}></TagName>}
                    description={
                      <Space size={"small"}>
                        {/* 2.温度 */}
                        {item.temperature === 1 ? (
                          <IconFont type="icon-Coffee" />
                        ) : (
                          <IconFont type="icon-coffee-cold" />
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
                              // color: "rgba(0, 0, 0, 0.55)",
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

const ProductsComponent = ({ pricesByOriginalPrice }) => {
  const priceEntries = Object.entries(pricesByOriginalPrice); // 将对象转换为 [key, value] 形式的数组

  return (
    <Space
      size={"large"}
      style={{
        marginTop: "0.8em",
        marginBottom: "0.8em",
      }}
    >
      {priceEntries.map(([key, prices], index) => (
        <Tag key={index} bordered={false} color="#e6f4ff">
          <Space>
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
                fontSize: "0.8em",
              }}
            >
              ¥{key}
            </Text>
            <Text>x{prices.length}</Text>
          </Space>
        </Tag>
      ))}
    </Space>
  );
};

const TempComponent = ({ tempDict }) => {
  const tempEntries = Object.entries(tempDict);
  return (
    <Space
      size={"large"}
      style={{
        marginTop: "0.8em",
        marginBottom: "0.8em",
      }}
    >
      {tempEntries.map(([key, value], index) => (
        <Tag key={index} bordered={false} color="#e6f4ff">
          <Text>{key}</Text>
          <Text>x{value}</Text>
        </Tag>
      ))}
    </Space>
  );
};

export default DayDetail;
