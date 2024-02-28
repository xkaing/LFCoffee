import { Typography, Popover } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import DeployTimeline from "./DeployTimeline";
const { Text } = Typography;

const appVerNum = "v0.10.6-beta";

const AppVersion = () => {
  return (
    <Popover content={<DeployTimeline />} title="部署时间线">
      <Text
        type="warning"
        style={{
          fontSize: "1.2rem",
        }}
      >
        <CodeOutlined
          style={{
            paddingRight: 6,
          }}
        />
        {appVerNum}
      </Text>
    </Popover>
  );
};

export default AppVersion;
