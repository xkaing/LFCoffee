import { Typography, Popover } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import DeployTimeline from "./DeployTimeline";
const { Text } = Typography;

const appVerNum = "v0.5.5-beta";

const AppVersion = () => {
  return (
    <Popover content={<DeployTimeline />} title="Deploy Timeline">
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
