import { Column } from "@ant-design/plots";

const ChartColumnTeamCups = (data) => {
  const config = {
    data: data.arr,
    xField: "name",
    yField: "count",
    // X 轴相关配置
    xAxis: {
      label: {
        rotate: 45, // 设置倾斜角度，正值表示逆时针旋转，负值表示顺时针旋转
      },
    },
  };
  return <Column {...config} />;
};

export default ChartColumnTeamCups;
