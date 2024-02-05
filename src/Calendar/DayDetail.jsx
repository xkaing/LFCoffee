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
  if (itemData && itemData.income && itemData.expend) {
    profitNum = itemData.income - itemData.expend;
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
              {itemData.income && (
                <Statistic
                  title="Income (CNY)"
                  value={itemData.income}
                  precision={2}
                />
              )}
              {itemData.expend && (
                <Statistic
                  title="Expend (CNY)"
                  value={itemData.expend}
                  precision={2}
                />
              )}
              {itemData.income && (
                <Statistic
                  title="Profit (CNY)"
                  value={profitNum}
                  valueStyle={
                    profitNum >= 0 ? { color: "#3f8600" } : { color: "#cf1322" }
                  }
                  precision={2}
                />
              )}
            </Space>

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
                    // description={ <DetailListDesc
                    //   temp={item.temperature}
                    //   name={item.name}
                    //   price={item.price}
                    //   originalPrice={item.original_price}
                    // /> }
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
export default DayDetail;
