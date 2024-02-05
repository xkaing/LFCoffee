import "./App.css";
import CoffeeCalendar from "./Calendar/CoffeeCalendar";
import { ConfigProvider, theme, Tag } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

let themeAlgorithm = "no-preference";

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  themeAlgorithm = "dark";
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  themeAlgorithm = "light";
}
console.log(themeAlgorithm);

function App() {
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm:
          themeAlgorithm === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Tag
        bordered={false}
        color="error"
        icon={<CodeOutlined />}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "1.2em",
        }}
      >
        v0.1.0-alpha
      </Tag>
      <CoffeeCalendar />
    </ConfigProvider>
  );
}

export default App;
