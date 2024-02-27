import React, { useState, useContext } from "react";
import { Avatar, Flex, Segmented } from "antd";
import { PersonDataContext } from "../contexts/CoffeeDataContext.jsx";
import EmptyData from "../components/EmptyData.jsx";
import PersonDetail from "./PersonDetail.jsx";

const Person = () => {
  return (
    <div>
      <PersonSegmented />
    </div>
  );
};

const PersonSegmented = () => {
  const [value, setValue] = useState("fe-1");
  const contextData = useContext(PersonDataContext);
  if (!contextData) {
    return <EmptyData />;
  }
  const personArr = contextData.personInfoArr;

  const labelArr = personArr.map((item, index) => ({
    label: (
      <div
        key={index}
        style={{
          padding: 4,
        }}
      >
        <Avatar src={item.url} />
        <div>{item.name}</div>
      </div>
    ),
    value: item.key,
  }));

  return (
    <Flex gap="small" align="center" vertical>
      <Segmented
        options={labelArr}
        size="middle"
        value={value}
        onChange={setValue}
      />
      <PersonDetail drinker={value} />
    </Flex>
  );
};

export default Person;
