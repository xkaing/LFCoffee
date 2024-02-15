import React from "react";
import { RestTwoTone, GithubOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
const RoutesIndex = () => (
  <Result
    icon={<RestTwoTone />}
    title="LaiFeng mobile-end dev team coffee log"
    extra={
      <Button type="primary" icon={<GithubOutlined />} disabled>
        issue
      </Button>
    }
  />
);
export default RoutesIndex;
