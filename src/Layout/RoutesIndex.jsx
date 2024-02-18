import React from "react";
import { RestTwoTone, GithubOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
const RoutesIndex = () => (
  <Result
    icon={<RestTwoTone />}
    title="LaiFeng mobile-end dev team coffee log"
    extra={
      <Button
        type="text"
        disabled
        size="large"
        icon={<GithubOutlined />}
        style={{
          color: "purple",
        }}
      >
        issue
      </Button>
    }
  />
);
export default RoutesIndex;
