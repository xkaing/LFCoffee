import { Column } from "@ant-design/plots";

const TopCupsColumn = (data) => {
  const config = {
    data: data.arr,
    xField: "name",
    yField: "count",
    colorField: "count",
  };
  return <Column {...config} />;
};

export default TopCupsColumn;
