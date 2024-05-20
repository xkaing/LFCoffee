import a1 from "./assets/avatar/android-1.jpg";
import a2 from "./assets/avatar/android-2.jpg";
import a3 from "./assets/avatar/android-3.jpg";
import i1 from "./assets/avatar/ios-1.jpg";
import i2 from "./assets/avatar/ios-2.jpg";
import i3 from "./assets/avatar/ios-3.jpg";
import i4 from "./assets/avatar/ios-4.jpg";
import f1 from "./assets/avatar/fe-1.jpg";

const mapKeyAvatarUrl = {
  "android-1": a1,
  "android-2": a2,
  "android-3": a3,
  "ios-1": i1,
  "ios-2": i2,
  "ios-3": i3,
  "ios-4": i4,
  "fe-1": f1,
};

const mapKeyName = {
  "android-1": "姜振",
  "android-2": "刘磊",
  "android-3": "李泽晋",
  "ios-1": "汪潇翔",
  "ios-2": "周洋",
  "ios-3": "曹海洋",
  "ios-4": "张亚东",
  "fe-1": "汪潇凯",
};

// 添加 姓名和头像
export const addRealNameAndUrl = (sData) => {
  const newData = sData.map(addRealNameAndUrlInObject);
  const completeCycleData = newData.slice(0, -2); // 只取完整周期数据
  return completeCycleData;
};

const addRealNameAndUrlInObject = (item) => {
  if (
    typeof item === "object" &&
    item !== null &&
    Array.isArray(item.drinker_list)
  ) {
    // 处理第一层，因为包含数组
    item.drinker_list = item.drinker_list.map(addRealNameAndUrlInObject); // 递归遍历数组
    if ("payer" in item) {
      item.payer_name = mapKeyName[item.payer] || item.payer;
    }
  } else if (typeof item === "object" && item !== null) {
    if ("payer" in item) {
      // 特殊情况-登记购买人，但是没有购买信息
      item.payer_name = mapKeyName[item.payer] || item.payer;
    } else {
      // 处理第二层，因为不包含数组
      item.drinker_name = mapKeyName[item.drinker] || item.drinker;
      item.drinker_url = mapKeyAvatarUrl[item.drinker] || item.drinker;
    }
  }
  return item;
};

export const addNameInSteps = (sData) => {
  const newStepsArr = sData.map((item) => ({
    payer: item,
    title: mapKeyName[item] || item,
  }));
  return newStepsArr;
};
