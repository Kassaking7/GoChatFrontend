import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import "./register.css"

export default function Register() {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/register', values);
      if (response.status === 200) {
        router.push('/login'); // If registration is successful, redirect to the login page
      }
    } catch (error) {
      console.error(error);
      // Handle error here, for example show an error message
    }
  };

  const handleBackToLogin = () => {
    router.push('/login'); // Redirect to the login page when the back button is clicked
  };

  return (
    <Form
      name="normal_register"
      className="register-form"
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
        name="email"
        rules={[
          { required: true, message: 'Please input your E-mail!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" />
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
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your Password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="registers-form-button" icon={<UserAddOutlined />}>
          Register
        </Button>
        <Button type="default" htmlType="button" className="back-to-login-button" onClick={handleBackToLogin}>
          Back to login
        </Button>
      </Form.Item>
    </Form>
  );
}
