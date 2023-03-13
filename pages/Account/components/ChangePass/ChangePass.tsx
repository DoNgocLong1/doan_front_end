import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "apiServices/userServices";

const ChangePass = () => {
  interface IchangePasswordFormData {
    current_password: string;
    new_password: string;
    retype_new_password: string;
  }
  const onFinish = async (values: IchangePasswordFormData) => {
    const formData = {
      password: values.current_password,
      new_password: values.new_password,
      confirm_password: values.retype_new_password,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    changePassword(formData, config);
    console.log(changePassword(formData, config));
  };
  return (
    <Form layout="horizontal" size="large" onFinish={onFinish}>
      <Form.Item name="current_password" label="Current password">
        <Input.Password
          placeholder="Current password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item name="new_password" label="New password">
        <Input.Password placeholder="New password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item name="retype_new_password" label="Retype new password">
        <Input.Password
          placeholder="Retype new password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Button</Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePass;
