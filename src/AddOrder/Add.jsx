import React from "react";
import { Button, DatePicker, Form, Input, Typography, Space } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Add = () => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
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
        maxWidth: 600,
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
        <Input />
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
        <Input />
      </Form.Item>

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
      <Form.Item noStyle shouldUpdate>
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
