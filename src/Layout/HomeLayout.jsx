import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";

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
    label: <Link to={`/chart`}>Chart</Link>,
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
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["calendar"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
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
