import React from "react";
import { Modal, Avatar, List, Tag, Space, Statistic } from "antd";
import TagName from "./TagName";
import { MoneyCollectTwoTone } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/c/font_4431122_7shzfw4dvg3.js",
    //icon-coffee-cold, icon-Coffee
  ],
});

const DayDetail = ({ data, date, visible, onClose }) => {
  const itemData = data.find((item) => item.date === date.format("YYYY-MM-DD"));
  let profitNum = 0
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
                  profitNum > 0
                    ? { color: "#3f8600" }
                    : profitNum < 0
                    ? { color: "#cf1322" }
                    : { color: "#000000" }
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
                      <>
                        {item.temperature === 1 ? (
                          <IconFont type="icon-Coffee" />
                        ) : (
                          <IconFont type="icon-coffee-cold" />
                        )}
                        <span>&nbsp;&nbsp;{item.name}&nbsp;&nbsp;</span>
                        <Tag
                          icon={<MoneyCollectTwoTone />}
                          color="default"
                          bordered={false}
                        >
                          {item.price}
                        </Tag>
                      </>
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
export default DayDetail;