import "./App.css";
import CoffeeCalendar from "./Calendar/CoffeeCalendar";
import { ConfigProvider, theme} from "antd";
import locale from "antd/locale/zh_CN";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

let themeAlgorithm;

if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  console.log('dark')
  themeAlgorithm = "dark"
}else if ( window.matchMedia('(prefers-color-scheme: light)').matches){
  console.log('light')
  themeAlgorithm = "light"
}else{
  console.log('no-preference')
}

function App() {
  return (
    <ConfigProvider locale={locale} theme={
      {
        algorithm:themeAlgorithm === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
      }
    }>
      <CoffeeCalendar />
    </ConfigProvider>
  );
}

export default App;
