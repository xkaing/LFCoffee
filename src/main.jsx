import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; //全局样式

import HomeLayout from "./Layout/HomeLayout.jsx"; // 菜单布局

import ErrorPage from "./Layout/ErrorPage.jsx"; //路由错误页
import RoutesIndex from "./Layout/RoutesIndex.jsx"; //路由根页面
import EmptyPage from "./components/EmptyPage.jsx"; //空页面

import Welcome, { loader as welcomeLoader } from "./Welcome/Welcome.jsx"; //Welcome模块
import CoffeeCalendar from "./Calendar/CoffeeCalendar.jsx"; //日历模块
import TeamChart from "./Chart/TeamChart.jsx"; //TeamChart模块
import Person from "./Person/Person.jsx"; //Person模块
import XKTrophies from "./XKTrophies/XKTrophies.jsx"; //XKTrophies模块
// 全局化配置
import { ConfigProvider, theme } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RoutesIndex /> },
      {
        path: "/welcome",
        element: <Welcome />,
        loader: welcomeLoader,
      },
      {
        path: "/calendar",
        element: <CoffeeCalendar />,
      },
      {
        path: "/chart",
        element: <TeamChart />,
      },
      {
        path: "/person",
        element: <Person />,
      },
      {
        path: "/xk-trophies-js-demo",
        element: <XKTrophies />,
      },
    ],
  },
]);

let themeAlgorithm = "no-preference";

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  themeAlgorithm = "light"; //关闭暗黑模式
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  themeAlgorithm = "light";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm:
          themeAlgorithm === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
