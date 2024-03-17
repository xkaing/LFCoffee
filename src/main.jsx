import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; //全局样式

import HomeLayout from "./Layout/HomeLayout.jsx"; // 菜单布局

import ErrorPage from "./Layout/ErrorPage.jsx"; //路由错误页
import RoutesIndex from "./Layout/RoutesIndex.jsx"; //路由根页面
import EmptyPage from "./Layout/EmptyPage.jsx"; //空页面

import Welcome, { loader as welcomeLoader } from "./Welcome/Welcome.jsx"; //Welcome模块
import TotalDataCard from "./Welcome/TotalDataCard.jsx"; //Welcome模块-V2
import CoffeeCalendar from "./Calendar/CoffeeCalendar.jsx"; //日历模块
import Teams, { loader as teamsLoader } from "./Teams/Teams.jsx"; //团队模块
import Teams2 from "./Teams/Teams2.jsx"; //团队模块-V2
import Person from "./Person/Person.jsx"; //个人模块
import Add from "./AddOrder/Add.jsx";
import XKTrophies, {
  loader as xkTrophiesLoader,
} from "./XKTrophies/XKTrophies.jsx"; //XKTrophies模块

// 全局化配置
import { ConfigProvider, theme } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
// 全局数据
import { CoffeeDataContextProvider } from "./contexts/CoffeeDataContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <TotalDataCard /> },
      {
        path: "/welcome",
        element: <TotalDataCard />,
        loader: welcomeLoader,
      },
      {
        path: "/calendar",
        element: <CoffeeCalendar />,
      },
      // {
      //   path: "/teams",
      //   element: <Teams />,
      //   loader: teamsLoader,
      // },
      {
        path: "/teams",
        element: <Teams2 />,
      },
      {
        path: "/person",
        element: <Person />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/xk-trophies-js-demo",
        element: <XKTrophies />,
        loader: xkTrophiesLoader,
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
      <CoffeeDataContextProvider>
        <RouterProvider router={router} />
      </CoffeeDataContextProvider>
    </ConfigProvider>
  </React.StrictMode>
);
