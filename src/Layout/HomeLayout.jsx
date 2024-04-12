import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
import { Typography } from "antd";
import AppVersion from "../components/AppVersion";

const { Text } = Typography;

const { Header, Content, Footer } = Layout;
const items = [
  {
    key: "welcome",
    label: <Link to={`/welcome`}>首页</Link>,
  },
  {
    key: "calendar",
    label: <Link to={`/calendar`}>日历</Link>,
  },
  {
    key: "teams",
    label: <Link to={`/teams`}>团队</Link>,
  },
  {
    key: "person",
    label: <Link to={`/person`}>个人</Link>,
  },
  {
    key: "table",
    label: <Link to={`/table`}>列表</Link>,
  },
  {
    key: "add",
    label: <Link to={`/add`}>add</Link>,
  },
  {
    key: "xk-trophies-js-demo",
    label: <Link to={`/xk-trophies-js-demo`}>Trophy</Link>,
  },
];
const HomeLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="demo-logo"
          style={{
            marginRight: 24,
          }}
        >
          <Text
            strong
            style={{
              color: "white",
              fontSize: "1.3rem",
            }}
          >
            LFCoffee
          </Text>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["welcome"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <AppVersion />
      </Header>
      <Content
        style={{
          padding: "48px 48px 0 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        LFCoffee ©{new Date().getFullYear()} Created by XiaoKai
      </Footer>
    </Layout>
  );
};
export default HomeLayout;
