import React from "react";
import { Modal } from "antd";

const DayDetail = ({ date, visible, onClose }) => {
  return (
    <>
      <Modal
        title="Day Detail"
        open={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <p>Selected date: {date.format("YYYY-MM-DD")}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default DayDetail;