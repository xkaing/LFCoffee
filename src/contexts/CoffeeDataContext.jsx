import { createContext } from "react";
import { getCoffeeData } from "../serve";
import { useEffect, useState } from "react";
import { addRealNameAndUrl } from "../tools";
import Decimal from "decimal.js";

export const CoffeeDataContext = createContext();

export const CoffeeDataContextProvider = ({ children }) => {
  const [coffeeData, setCoffeeData] = useState();

  useEffect(() => {
    getCoffeeData().then((data) => {
      const newData = processData(data);
      setCoffeeData(newData);
    });
  }, []);

  return (
    <CoffeeDataContext.Provider value={coffeeData}>
      {children}
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

  // chart数据处理
  let dateDataArr = []; // X：时间，Y：每天利润，每天咖啡平均价格，

  // let personDataArr = []; // X；人物，Y：每个人的咖啡支出，每个人的咖啡小费,每个人喝的咖啡数量
  let personExpend = {}; //每个人每次的咖啡支出
  let personProfit = {}; // 每个人每次的小费支出
  let personCupsnum = {}; //每个人喝的咖啡数量

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
        totalCupsArray.push(val); //所有杯详情
        // 计算-每个人喝的咖啡数量
        personCupsnum[val.drinker_name] = personCupsnum[val.drinker_name]
          ? (personCupsnum[val.drinker_name] += 1)
          : 1;
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
      date,
      profit,
      average,
    });
  });

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
  };

  const totalData = {
    sourceDataArr: nDataArr,
    totalInfo: totalInfo,
    dateDataArr, //时间刻度相关数据
    coffeeData: {
      // 咖啡相关数据
      coffeeNameNum,
      coffeeTempNum,
      coffeePriceNum,
    },
    personData: {
      // 人物相关数据
      personExpend,
      personProfit,
      personCupsnum,
    },
  };
  return totalData;
};