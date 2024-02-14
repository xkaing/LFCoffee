import CoffeeCalendar from "./Calendar/CoffeeCalendar";
import { ConfigProvider, theme } from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

let themeAlgorithm = "no-preference";

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  themeAlgorithm = "light";
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
      <CoffeeCalendar />
    </ConfigProvider>
  );
}

export default App;
