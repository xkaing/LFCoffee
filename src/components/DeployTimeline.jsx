import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline, Typography } from "antd";
const { Text } = Typography;
const DeployTimeline = () => (
  <Timeline
    mode="right"
    style={{
      width: 400,
      height: 800,
      overflowY: "auto",
      paddingTop: 5,
    }}
    items={[
      {
        label: (
          <>
            <p>2024-02-26</p>
            <Text type="warning">v0.9.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>使用useContext重构数据层</p>
            <p>add:decimal.js</p>
            <p>更新部分成员头像</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-24</p>
            <Text type="warning">v0.8.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>新增团队经济图表</p>
            <p>优化团队部分图表X轴</p>
            <p>团队成员代号替换为姓名</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-22</p>
            <Text type="warning">v0.7.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>新增个人利润图表</p>
            <p>日期利润改为柱状图</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-20</p>
            <Text type="warning">v0.6.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>新增词云图</p>
            <p>新增比例饼图图表</p>
            <p>新增价格折现图表</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-18</p>
            <Text type="warning">v0.5.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>新增Teams模块</p>
            <p>新增团队数据图表</p>
            <p>优化隐藏路由</p>
            <p>add:antv/plots</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-16</p>
            <Text type="warning">v0.4.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>新增总体统计数据</p>
            <p>新增隐藏路由</p>
            <p>新增路由加载器</p>
            <p>add:react-countup</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-15</p>
            <Text type="warning">v0.3.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>优化路由和菜单</p>
            <p>新增部署时间线</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-14</p>
            <Text type="warning">v0.2.0-beta</Text>
          </>
        ),
        color: "orange",
        children: (
          <>
            <p>启用新域名</p>
            <p>add: react-router</p>
            <p>新增菜单和路由</p>
            <p>新增空状态组件</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-06</p>
            <Text type="danger">v0.1.3-alpha</Text>
          </>
        ),
        color: "red",
        children: (
          <>
            <p>启用Vercel CI/CD</p>
            <p>更换网站图标</p>
            <p>添加用户头像</p>
            <p>新增温度和价位</p>
          </>
        ),
      },
      {
        label: (
          <>
            <p>2024-02-02</p>
            <Text type="danger">v0.1.0-alpha</Text>
          </>
        ),
        color: "red",
        children: (
          <>
            <p>关闭暗黑模式</p>
            <p>完善每日详情</p>
            <p>添加版号</p>
          </>
        ),
      },
      {
        dot: (
          <ClockCircleOutlined
            style={{
              fontSize: "16px",
            }}
          />
        ),
        label: "2024-01-31",
        children: <Text>新建文件夹</Text>,
      },
    ]}
  />
);
export default DeployTimeline;
