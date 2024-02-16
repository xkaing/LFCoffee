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
    label: <Link to={`/welcome`}>Welcome</Link>,
  },
  {
    key: "calendar",
    label: <Link to={`/calendar`}>Calendar</Link>,
  },
  {
    key: "chart",
    // label: "Chart",
    label: <Link to={`/chart`}>Chart</Link>,
    disabled: false,
  },
  {
    key: "person",
    // label: "Person",
    label: <Link to={`/person`}>Person</Link>,
    disabled: false,
  },
  {
    key: "xk-trophies-js-demo",
    label: <Link to={`/xk-trophies-js-demo`}>Trophy</Link>,
    disabled: false,
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
          // defaultSelectedKeys={["calendar"]}
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
