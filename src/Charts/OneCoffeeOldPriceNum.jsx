import { Pie } from "@ant-design/plots";
const OneCoffeeOldPriceNum = ({ obj }) => {
  const data = Object.entries(obj).map(([name, count]) => ({
    name,
    count,
  }));
  data.sort((a, b) => a.count - b.count); //升序
  const config = {
    data,
    width: 450,
    height: 450,
    angleField: "count",
    colorField: "name",
    label: {
      text: "count",
      style: {
        fontWeight: "bold",
      },
      fontSize: 14,
    },
    legend: {
      color: {
        title: false,
        position: "top",
        rowPadding: 5,
        itemLabelFontSize: 14,
      },
    },
  };
  return <Pie {...config} />;
};

export default OneCoffeeOldPriceNum;
