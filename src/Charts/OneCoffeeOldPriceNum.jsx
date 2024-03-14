import { Pie } from "@ant-design/plots";
const OneCoffeeOldPriceNum = ({ obj }) => {
  const data = Object.entries(obj).map(([name, count]) => ({
    name,
    count,
  }));
  data.sort((a, b) => a.value - b.value); //升序
  const config = {
    data,
    width: 400,
    height: 400,
    angleField: "count",
    colorField: "name",
    paddingRight: 80,
    innerRadius: 0.6,
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
    annotations: [
      {
        type: "text",
        style: {
          text: "价位",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };
  return <Pie {...config} />;
};

export default OneCoffeeOldPriceNum;
