// import React from "react";
import { Tag } from "antd";

const YearColorTag = ({ date }) => {
  const firstFourChars = date.slice(0, 4);
  let dateColor = null;

  switch (firstFourChars) {
    case "2024":
      dateColor = "#FFBE98";
      break;
    case "2023":
      dateColor = "#AF2C5F";
      break;
    case "2022":
      dateColor = "#6C5EFB";
      break;
    case "2021":
      dateColor = "#636C6F";
      break;
    case "2020":
      dateColor = "#1A4876";
      break;
    case "2019":
      dateColor = "#FF6F51";
      break;
    case "2018":
      dateColor = "#6A0DAD";
      break;
    case "2017":
      dateColor = "#7BC043";
      break;
    case "2016":
      dateColor = "#607D8B";
      break;
    case "2015":
      dateColor = "#994D43";
      break;
    default:
      break;
  }

  return dateColor ? (
    <Tag
      color={dateColor}
      style={{
        fontSize: "14px",
      }}
    >
      {date}
    </Tag>
  ) : null;

  //   return <Tag color={dateColor}>{date}</Tag>;
};

export default YearColorTag;

/**
2024年：PANTONE 13-1023 Peach Fuzz (柔和桃), 十六进制色号是 #FFBE98
2023年：PANTONE 18-1750 Viva Magenta (非凡洋红), 十六进制色号是 ##AF2C5F
2022年：PANTONE 17-3938 Very Peri（长春花蓝）, 十六进制色号 #6C5EFB
2021年：PANTONE 17-3938 Ultimate Gray + PANTONE 13-0647 Illuminating（极致灰+亮丽黄）, 分别为 #636C6F 和 #FFC107
2020年：PANTONE 19-4052 Classic Blue（经典蓝）, 十六进制色号 #1A4876
2019年：PANTONE 16-1546 Living Coral（活力珊瑚橘）, 十六进制色号 #FF6F51
2018年：PANTONE 18-3838 Ultra Violet（紫外光）, 十六进制色号 #6A0DAD
2017年：PANTONE 15-0343 Greenery（草木绿）, 十六进制色号 #7BC043
2016年：PANTONE 15-3919 Serenity + PANTONE 13-1520 Rose Quartz（静谧蓝+粉晶）, 分别为 #607D8B 和 #FFC0CB
2015年：PANTONE 18-1438 Marsala（玛萨拉酒红）, 十六进制色号 #994D43
2014年：PANTONE 18-3224 Radiant Orchid（兰花紫）, 十六进制色号 #DA70D6
2013年：PANTONE 16-1546 Living Coral（活力珊瑚橘）, 十六进制色号 #FF6F51
2012年：PANTONE 18-3224 Radiant Orchid（兰花紫）, 十六进制色号 #DA70D6
2011年：PANTONE 18-3224 Radiant Orchid（兰花紫）, 十六进制色号 #DA70D6
 */
