import React from "react";
import { Empty } from "antd";
const EmptyData = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={<p>Data Not Found</p>}
  />
);
export default EmptyData;
