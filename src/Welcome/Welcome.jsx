import React from "react";
import { Result } from "antd";
import { createFromIconfontCN, GithubOutlined } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4431122_4ra4s891ysd.js",
});
// icon-shigong 施工
// icon-shigonggongdi 施工工地
// icon-source-code 代码

const Welcome = () => (
  <Result
    // status="warning"
    icon={<IconFont type="icon-shigong" />}
    title="Welcome Page Under Construction."
  />
);
export default Welcome;
