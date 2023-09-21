import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import "./login.css"
import React, { useEffect , useState } from "react";
export default function Login() {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values, { withCredentials: true });
      if (response.status === 200) {
        router.push('/'); // If login is successful, redirect to the home page
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    router.push('/register'); // Redirect to the registration page when the register button is clicked
  };
  useEffect(() => {
    // Check for the presence of the "username" cookie
    const usernameCookie = document.cookie.includes('username=');

    // If the "username" cookie is not present, redirect to the login page
    if (usernameCookie) {
      router.push('/'); // Replace with your actual login route
    }

    // ... Rest of your useEffect logic

  }, []);
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" icon={<LoginOutlined />}>
          Log in
        </Button>
        <Button type="default" htmlType="button" className="register-form-button" icon={<UserAddOutlined />} onClick={handleRegister}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
