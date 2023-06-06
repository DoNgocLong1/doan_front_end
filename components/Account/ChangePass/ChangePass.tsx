import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "@/apiServices/userServices";
import { getCookie } from "@/helper";
import { useMutation } from "react-query";
import { ErrorMessage } from "@/styled/Account.styled";

const ChangePass = () => {
  interface IchangePasswordFormData {
    current_password: string;
    new_password: string;
    retype_new_password: string;
  }

  const [messageApi, contextHolder] = message.useMessage();
  const token: string = getCookie("token") || '';
  const [error, setError] = useState<string>('');
  const purchaseAgainMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add products to cart success',
      });
    },
    onError: (error: any) => {
      messageApi.open({
        type: 'error',
        content: 'Add products to cart failed',
      });
    },
    mutationFn: (formData: any) => changePassword(formData, token)
  })

  const onFinish = async (values: IchangePasswordFormData) => {
    const formData = {
      password: values.current_password,
      newPassword: values.new_password
    };
    //purchaseAgainMutation.mutate(formData)
    const actionChangePassword: any = await changePassword(formData, token)
    if (actionChangePassword.status !== 200) {
      setError(actionChangePassword?.data || '')
    } else {
      setError('')
      messageApi.open({
        type: 'success',
        content: 'Change password success',
      });
    }
  };
  return (
    <Form layout="horizontal" size="large" onFinish={onFinish}>
      {contextHolder}
      <Form.Item
        name="current_password"
        label="Current password"
        rules={[
          { required: true, message: "Please input your Current password!" },
          { max: 200, message: "please input less than 200 characters" },
        ]}
      >
        <Input.Password
          placeholder="Current password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="new_password"
        label="New password"
        rules={[
          { required: true, message: "Please input your New password!" },
          { max: 200, message: "please input less than 200 characters" },
        ]}
      >
        <Input.Password placeholder="New password" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="retype_new_password"
        label="Retype new password"
        dependencies={["new_password"]}
        rules={[
          { required: true, message: "Please Retype your new password!" },
          { max: 200, message: "please input less than 200 characters" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("new_password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Repeat password incorrect!"
                )
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Retype new password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form.Item>
        <Button htmlType="submit">Button</Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePass;
