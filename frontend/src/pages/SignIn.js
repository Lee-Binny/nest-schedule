import React from 'react';
import styled, {keyframes} from 'styled-components';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const SignIn = () => {
  return (
    <Container>
      <LoginBox>
        <Title>
          <Title1>Go</Title1>
          <Title2>Our</Title2>
          <Title3>Schedule</Title3>
        </Title>
        <Form
          name="signin-form"
          className="login-form"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ width: '100%' }}
        >
          <Form.Item
            name="id"
            rules={[{ required: true, message: '아이디를 입력하세요!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디를 입력하세요" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호룰 입력하세요!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </LoginBox>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 480px;
  height: 650px;
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;
`;

const Title = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  margin: 20px 0;
`;

const animate = keyframes`
  0%    {color: var(--color-1)}
  32%   {color: var(--color-1)}
  33%   {color: var(--color-2)}
  65%   {color: var(--color-2)}
  66%   {color: var(--color-3)}
  99%   {color: var(--color-3)}
  100%  {color: var(--color-1)}
`;

const Title1 = styled.span`
  --color-1: #ACCFCB;
  --color-2: #3D8DAE;
  --color-3: #E4A9A8;
  animation: ${animate} 4s linear infinite;
  margin-right: 5px;
`;

const Title2 = styled.span`
  --color-1: #E4A9A8;
  --color-2: #ACCFCB;
  --color-3: #3D8DAE;
  animation: ${animate} 4s linear infinite;
  margin-right: 5px;
`;

const Title3 = styled.span`
  --color-1: #3D8DAE;
  --color-2: #E4A9A8;
  --color-3: #ACCFCB;
  animation: ${animate} 4s linear infinite;
  margin-right: 5px;
`;

export default SignIn;