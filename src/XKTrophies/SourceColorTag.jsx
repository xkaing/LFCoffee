import { Tag } from "antd";

const SourceColorTag = ({ channel }) => {
  let channelColor = null;

  switch (channel) {
    case "Physical Disc":
      channelColor = "black";
      break;
    case "Game Catalogue":
      channelColor = "#ECBF2C";
      break;
    case "Monthly games":
      channelColor = "#bfbfbf";
      break;
    case "PS Store":
      channelColor = "#3F70CD";
      break;
    default:
      break;
  }

  return <Tag color={channelColor}>{channel}</Tag>;
};

export default SourceColorTag;
