import { useContext } from "react";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext.jsx";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Segmented } from "antd";

const Person = () => {
  return (
    <div>
      <PersonSegmented />
    </div>
  );
};

const PersonSegmented = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented
      options={[
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              <div>User 1</div>
            </div>
          ),
          value: "user1",
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                }}
              >
                K
              </Avatar>
              <div>User 2</div>
            </div>
          ),
          value: "user2",
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
              <div>User 3</div>
            </div>
          ),
          value: "user3",
        },
      ]}
    />
  </Flex>
);
export default Person;
