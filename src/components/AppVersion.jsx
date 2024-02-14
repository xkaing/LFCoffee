import { Tag, Button, Typography } from "antd";
import { CodeOutlined, MergeOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;

const appVerNum = "v0.2.4-beta";

const AppVersion = () => {
  return (
    // <Button type="primary" ghost icon={<CodeOutlined />} size="small">
    //   {appVerNum}
    // </Button>
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
  );
};

export default AppVersion;
