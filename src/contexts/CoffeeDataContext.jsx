import { createContext } from "react";
import { getCoffeeData } from "../serve";
import { useEffect, useState } from "react";
import { addRealNameAndUrl } from "../tools";
import Decimal from "decimal.js";

// 全部数据
export const CoffeeDataContext = createContext();
// 全部杯咖啡详情
export const AllCupsContext = createContext();
// 总体数据
export const TotalInfoContext = createContext();
// 咖啡数据
export const CupsDataContext = createContext();
// 人物数据
export const PersonDataContext = createContext();
// 时间数据
export const DateDataContext = createContext();

export const CoffeeDataContextProvider = ({ children }) => {
  const [coffeeData, setCoffeeData] = useState();
  const [allCupsArray, setAllCupsArray] = useState();
  const [totalInfo, setTotalInfo] = useState();
  const [cupsData, setCupsData] = useState();
  const [personData, setPersonData] = useState();
  const [dateData, setDateData] = useState();

  useEffect(() => {
    getCoffeeData().then((data) => {
      const newData = processData(data);
      setCoffeeData(newData);
      setAllCupsArray(newData.totalCupsArray);
      setTotalInfo(newData.totalInfo);
      setCupsData(newData.coffeeData);
      setPersonData(newData.personData);
      setDateData(newData.dateDataArr);
    });
  }, []);

  return (
    <CoffeeDataContext.Provider value={coffeeData}>
      <AllCupsContext.Provider value={allCupsArray}>
        <TotalInfoContext.Provider value={totalInfo}>
          <CupsDataContext.Provider value={cupsData}>
            <PersonDataContext.Provider value={personData}>
              <DateDataContext.Provider value={dateData}>
                {children}
              </DateDataContext.Provider>
            </PersonDataContext.Provider>
          </CupsDataContext.Provider>
        </TotalInfoContext.Provider>
      </AllCupsContext.Provider>
    </CoffeeDataContext.Provider>
  );
};

// 数据处理
const processData = (data) => {
  // 添加真实姓名
  const nDataArr = addRealNameAndUrl(data);

  let totalIncome = new Decimal(0); //总收入
  let totalExpend = new Decimal(0); //总支出
  let totalCupsArray = []; //所有杯详情
  let totalPayerWaitArr = []; //买单人排期记录

  // chart数据处理
  let dateDataArr = []; // X：时间，Y：每天利润，每天咖啡平均价格，

  // let personDataArr = []; // X；人物，Y：每个人的咖啡支出，每个人的咖啡小费,每个人喝的咖啡数量
  let personIncome = {};
  let personExpend = {}; //每个人每次的咖啡支出
  let personProfit = {}; // 每个人每次的小费支出
  let personCupsnum = {}; //每个人喝的咖啡数量
  let personInfoArr = []; //每个人的信息

  let coffeeNameNum = {}; //咖啡名称-数量
  let coffeeTempNum = {}; //咖啡温度-数量
  let coffeePriceNum = {}; //咖啡价格-数量

  nDataArr.forEach((item) => {
    const date = item.date; //时间
    let profit = 0; //每天利润
    let average = 0; //每天平均价格

    if (item.income && item.expend) {
      totalIncome = totalIncome.plus(item.income); //计算-总收入
      totalExpend = totalExpend.plus(item.expend); //计算-总支出
      profit = Decimal.sub(item.income, item.expend).toNumber(); //计算-每天利润
      totalPayerWaitArr.push(item.payer);

      if (personIncome[item.payer]) {
        personIncome[item.payer].push(item.income);
      } else {
        personIncome[item.payer] = [item.income];
      }
      //计算-每个人每次的咖啡支出
      if (personExpend[item.payer_name]) {
        personExpend[item.payer_name].push(item.expend);
      } else {
        personExpend[item.payer_name] = [item.expend];
      }
      // 计算-每个人每次的小费支出
      if (personProfit[item.payer_name]) {
        personProfit[item.payer_name].push(profit);
      } else {
        personProfit[item.payer_name] = [profit];
      }
    }

    if (item.drinker_list) {
      average = Decimal.div(item.expend, item.drinker_list.length)
        .toDP(3)
        .toNumber(); //计算-每天的平均价格
      item.drinker_list.forEach((val) => {
        val.date = item.date;
        totalCupsArray.push(val); //所有杯详情
        // 计算-每个人喝的咖啡数量
        if (personCupsnum[val.drinker_name]) {
          personCupsnum[val.drinker_name] += 1;
        } else {
          personCupsnum[val.drinker_name] = 1;
          personInfoArr.push({
            key: val.drinker,
            name: val.drinker_name,
            url: val.drinker_url,
          });
        }
        // 计算-最常喝咖啡名称
        coffeeNameNum[val.name] = coffeeNameNum[val.name]
          ? coffeeNameNum[val.name] + 1
          : 1;
        // 计算-最常喝咖啡温度
        coffeeTempNum[val.temperature] = coffeeTempNum[val.temperature]
          ? coffeeTempNum[val.temperature] + 1
          : 1;
        // 计算-最常喝咖啡价格
        coffeePriceNum[val.original_price] = coffeePriceNum[val.original_price]
          ? coffeePriceNum[val.original_price] + 1
          : 1;
      });
    }

    dateDataArr.push({
      date: date.substring(5),
      payer: item.payer,
      name: item.payer_name,
      income: item.income,
      expend: item.expend,
      cups: item.drinker_list.length,
      profit,
      average,
    });
  });
  const totalWaiting = groupByEnding([...totalPayerWaitArr].reverse(), "fe-1"); //计算-总排期
  const totalProfit = totalIncome.sub(totalExpend).toNumber(); //计算-总利润
  const totalCupsNum = totalCupsArray.length; //总咖啡数量
  const totalAverage = totalExpend.div(totalCupsNum).toDP(3).toNumber(); //计算-总平均价格

  // 总体数据
  const totalInfo = {
    totalIncome: totalIncome.toNumber(),
    totalExpend: totalExpend.toNumber(),
    totalProfit,
    totalCupsNum,
    totalAverage,
    totalWaiting,
  };
  let dateDataArr2 = dateDataArr.filter((obj) => obj.average !== 0); // 剔除空订单
  dateDataArr2.reverse(); //数组倒序

  const totalData = {
    sourceDataArr: nDataArr,
    totalCupsArray,
    totalInfo: totalInfo,
    //时间刻度相关数据
    dateDataArr: dateDataArr2,
    // 咖啡相关数据
    coffeeData: {
      coffeeNameNum,
      coffeeTempNum,
      coffeePriceNum,
    },
    // 人物相关数据
    personData: {
      personIncome,
      personExpend,
      personProfit,
      personCupsnum,
      personInfoArr,
    },
  };
  return totalData;
};

// 计算-根据特定表示计算二维数组
function groupByEnding(arr, ending) {
  const result = [];
  let currentGroup = [];

  for (let i = 0; i < arr.length; i++) {
    currentGroup.push(arr[i]);

    if (arr[i] === ending) {
      // 当遇到结束标识时，将当前分组（包含结束标识）添加到结果中
      result.push([...currentGroup]);
      currentGroup = []; // 清空当前分组
    }
  }

  // 检查是否有未完成的分组（即数组末尾没有结束标识），若有则将其加入结果
  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
}
