import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { Modal, Avatar, List, Tag, Space, Statistic,Typography } from "antd";
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/c/font_4431122_rut41t8545r.js",
    //icon-Send-Money icon-coffee-cold1 icon-coffee-cup icon-coffee-cold icon-Coffee
  ],
});
const { Text } = Typography;

const DetailListDesc = ( temp,name,price,originalPrice) => {
  return (
    <Space size={"small"}>
      {/* 2.温度 */}
      {temp === 1 ? (
        <IconFont type="icon-coffee-cup" />
      ) : (
        <IconFont type="icon-coffee-cold" />
      )}
      {/* 3.名称 */}
      <Text>{name}</Text>
      {/* 4.价格 */}
      <Text type="danger">
        <Text
          type="danger"
          style={{
            fontSize: "0.8em",
          }}
        >
          ¥
        </Text>
        {price}
      </Text>
      {/* 5.原价 */}
      {originalPrice && (
        <Text
          delete
          style={{
            fontSize: "0.8em",
            color: "rgba(0, 0, 0, 0.55)",
          }}
        >
          ¥{originalPrice}
        </Text>
      )}
    </Space>
  )
}

export default DetailListDesc