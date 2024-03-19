import {
  Button,
  DatePicker,
  Form,
  Input,
  Typography,
  Space,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { CupsDataContext } from "../contexts/CoffeeDataContext";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const onCoffeeSearch = (value) => {
  console.log("search:", value);
};
// 对象转字典
function convertToObjectArray(map) {
  return Object.entries(map).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}
const mapKeyName = {
  "android-1": "姜振",
  "android-2": "刘磊",
  "android-3": "李泽晋",
  "ios-1": "汪潇翔",
  "ios-2": "周洋",
  "ios-3": "曹海洋",
  "fe-1": "汪潇凯",
};
const priceMapping = {
  23: "CNY: 23",
  26: "CNY: 26",
  29: "CNY: 29",
  32: "CNY: 32",
  35: "CNY: 35",
  38: "CNY: 38",
};
const tempeMapping = {
  0: "冰",
  1: "热",
};

const personSelArr = convertToObjectArray(mapKeyName);
const tempSelArr = convertToObjectArray(tempeMapping);
const oldPriceSelArr = convertToObjectArray(priceMapping);

const Add = () => {
  const cupsData = useContext(CupsDataContext) || {};
  // if (!cupsData) {
  //   return null;
  // }
  const coffeeSelArr = Object.entries(cupsData.coffeeNameNum).map(
    ([name, value]) => ({
      value: name,
      label: name,
    })
  );

  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    console.log(value);
  };
  const onReset = () => {
    form.resetFields();
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 800,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      variant="filled"
    >
      <Form.Item
        label="日期"
        name="date"
        rules={[
          {
            required: true,
            message: "必须有购买日期!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="买单"
        name="payer"
        rules={[
          {
            required: true,
            message: "必须有买单人!",
          },
        ]}
      >
        <Select
          placeholder="本次买单人"
          onChange={onGenderChange}
          options={personSelArr}
        />
      </Form.Item>
      <Form.Item label="收入" name="income">
        <Input />
      </Form.Item>
      <Form.Item
        label="支出"
        name="expend"
        rules={[
          {
            required: true,
            message: "必须有购买咖啡支出!",
          },
        ]}
      >
        <Input placeholder="本次纯咖啡支出" />
      </Form.Item>
      {/* List数据 */}
      <Form.Item label="咖啡列表">
        <Form.List name="drinker_list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "drinker"]}
                    style={{ width: 100 }}
                  >
                    <Select
                      placeholder="饮者"
                      onChange={onGenderChange}
                      options={personSelArr}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    style={{ width: 140 }}
                  >
                    <Select
                      showSearch
                      placeholder="咖啡"
                      onChange={onGenderChange}
                      onSearch={onCoffeeSearch}
                      options={coffeeSelArr}
                      filterOption={filterOption}
                      optionFilterProp="children"
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "temperature"]}
                    style={{ width: 70 }}
                  >
                    <Select
                      placeholder="温度"
                      onChange={onGenderChange}
                      options={tempSelArr}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "price"]}>
                    <Input placeholder="价格" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "original_price"]}
                    style={{ width: 100 }}
                  >
                    <Select
                      placeholder="价位"
                      onChange={onGenderChange}
                      options={oldPriceSelArr}
                      allowClear
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  加一杯咖啡
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      {/* 表单操作 */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            提交订单
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
      {/* 展示JSON数据 */}
      <Form.Item label="JSON.stringify" shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};
export default Add;
