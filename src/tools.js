const dictMarkName = {
    "android-1": "姜振",
    "android-2": "刘磊",
    "android-3": "李泽晋",
    "ios-1": "汪潇翔",
    "ios-2": "周洋",
    "ios-3": "曹海洋",
    "fe-1": "汪潇凯",
  };
  
  const mapPayerInObject = (item) => {
    if (
      typeof item === "object" &&
      item !== null &&
      Array.isArray(item.drinker_list)
    ) {
      // 处理数组
      item.drinker_list = item.drinker_list.map(mapPayerInObject); // 递归遍历数组
      if ("payer" in item) {
        item.payer = dictMarkName[item.payer] || item.payer;
      } else if ("drinker" in item) {
        item.drinker = dictMarkName[item.drinker] || item.drinker;
      }
    } else if (typeof item === "object" && item !== null) {
      // 处理非数组
      if ("payer" in item) {
        item.payer = dictMarkName[item.payer] || item.payer;
      } else if ("drinker" in item) {
        item.drinker = dictMarkName[item.drinker] || item.drinker;
      }
    }
    return item;
  };
  
  export const markBecomeName = (sData) => {
    let nData = sData.map(mapPayerInObject);
    return nData;
  };