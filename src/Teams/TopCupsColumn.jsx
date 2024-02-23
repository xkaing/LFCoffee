import { Column } from "@ant-design/plots";

const TopCupsColumn = (data) => {
  const config = {
    data: data.arr,
    xField: "name",
    yField: "count",
    colorField: "count",
    axis: {
      y: { labelFormatter: "~s" },
      x: {
        labelSpacing: 4,
        style: {
          labelTransform: "rotate(45)",
        },
      },
    },
  };
  return <Column {...config} />;
};

export default TopCupsColumn;
