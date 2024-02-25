import { createContext } from "react";
import { getCoffeeData } from "../serve";
import { useEffect, useState } from "react";
import { addRealName } from "../tools";

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
  const nDataArr = addRealName(data);

  let totalIncome = 0; //总收入
  let totalExpend = 0; //总支出
  let totalCupsArray = []; //所有杯详情

  let topCups = {}; //最常喝的咖啡
  let topPersonProfit = {}; // 团队每人产生的利润
  let topPersonIncome = {};
  let topPersonExpend = {};

  let dateDataArr = nDataArr.map((item) => {
    const date = item.date;
    let profit = 0;
    let average = 0;

    if (item.income && item.expend) {
      totalIncome += item.income; //计算-总收入
      totalExpend += item.expend; //计算-总支出
      profit = item.income - item.expend; //计算-每天利润
    }

    if (item.drinker_list) {
      average = item.expend / item.drinker_list.length; //计算-每天的平均价格
      item.drinker_list.forEach((drinkerItem) => {
        totalCupsArray.push(drinkerItem); //所有杯详情
      });
    }

    return {
      date: date,
      profit: profit,
      average: average,
    };
  });

  const totalProfit = totalIncome - totalExpend; //计算-总利润
  const totalCupsNum = totalCupsArray.length; //总咖啡数量
  const totalAverage = totalExpend / totalCupsNum; //计算-总平均价格

  // 总体数据
  const totalInfo = {
    totalIncome,
    totalExpend,
    totalProfit,
    totalCupsNum,
    totalAverage,
  };

  const totalData = {
    sourceDataArr: nDataArr,
    totalInfo: totalInfo,
    dateDataArr,
  };
  return totalData;
};

// chart数据处理
// X：时间，Y：每天利润，每天咖啡平均价格，
// X；人物，Y：每个人的咖啡支出，每个人的咖啡小费,每个人喝的咖啡数量

// chart数据
//  let dateProfit = {}; //每天利润
//  let dateAverage = {}; //每天的平均价

//  nDataArr.forEach((item) => {
//    if (item.income && item.expend) {
//      totalIncome += item.income; //计算-总收入
//      totalExpend += item.expend; //计算-总支出
//      dateProfit[item.date] = item.income - item.expend; //计算-每天利润
//    }
//    if (item.drinker_list) {
//      dateAverage[item.date] = item.expend / item.drinker_list.length; //计算-每天的平均价格
//      item.drinker_list.forEach((item) => {
//        totalCupsArray.push(item); //所有杯详情
//      });
//    }
//  });

//  let dateDataArr = nDataArr.map(item => {
//    const date = item.date;
//    return {
//      date: date,
//      profit: dateProfit[date] || 0, // 如果dateProfit中没有对应的日期，则默认为0
//      average: dateAverage[date] || 0 // 如果dateAverage中没有对应的日期，则默认为0
//    };
//  });
