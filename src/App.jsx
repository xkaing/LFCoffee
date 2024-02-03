import "./App.css";
import CoffeeCalendar from "./Calendar/CoffeeCalendar";
import { ConfigProvider, theme} from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={locale} theme={
      {
        algorithm:theme.darkAlgorithm
      }
    }>
      <CoffeeCalendar />
    </ConfigProvider>
  );
}

export default App;
