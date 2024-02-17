import { Progress } from "antd";

const progressColors = {
  "0%": "red",
  "20%": "yellow",
  "50%": "green",
  "80%": "blue",
};

const TrophyProgress = ({ progress }) => {
  return progress !== "-" ? (
    <Progress
      percent={progress}
      size={33}
      type="circle"
      //   strokeColor={progressColors}
    />
  ) : // <Progress percent={progress} size="small" steps={5} />
  null;
};

export default TrophyProgress;
