import React from "react";
import { Modal, Avatar, List } from "antd";

const DayDetail = ({ data, date, visible, onClose }) => {
  const itemData = data.find((item) => item.date === date.format("YYYY-MM-DD"));

  return (
    <>
      <Modal
        title="Day Detail"
        open={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <p>Selected date: {date.format("YYYY-MM-DD")}</p>
        <p>Payer: {itemData.payer}</p>
        <p>Week: {itemData.week}</p>
        <p>Income: {itemData.income}</p>
        <p>Expend: {itemData.expend}</p>
        <List
          itemLayout="horizontal"
          dataSource={itemData.drinker_list}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={item.drinker}
                description={item.name}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
export default DayDetail;
