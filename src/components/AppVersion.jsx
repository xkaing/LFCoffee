import React, { useState } from "react";
import { Typography, Popover, Drawer } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import DeployTimeline from "./DeployTimeline";
const { Text } = Typography;

const appVerNum = "v0.12.1-beta";

const AppVersion = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Text
        type="warning"
        style={{
          fontSize: "1rem",
        }}
        onClick={showDrawer}
      >
        <CodeOutlined
          style={{
            paddingRight: 6,
          }}
        />
        {appVerNum}
      </Text>
      <Drawer title="版本更新日志" onClose={onClose} open={open} width={400}>
        <DeployTimeline />
      </Drawer>
    </>
  );
};

export default AppVersion;
