import React from "react";
import { Button, Result } from "antd";
import { createFromIconfontCN, GithubOutlined } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4431122_4ra4s891ysd.js",
});
// icon-shigong 施工
// icon-shigonggongdi 施工工地
// icon-source-code 代码

const XKTrophies = () => {
  <p>1</p>;
};
export default XKTrophies;

export const XKTrophiesShigong = () => (
  <Result
    // status="warning"
    icon={<IconFont type="icon-source-code" />}
    title="XKTrophies JS Demo"
  />
);
