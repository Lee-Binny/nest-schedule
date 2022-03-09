import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import UserAPI from '../apis/user';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const onChange = (e) => {
    setSignUpData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    const res = await UserAPI.createUser(signUpData);
    if (res && res.result) {
      document.location.href = '/signin'
    }
  }

  return (
    <Container>
      <SignUpBox>
        <Title>
          Sign Up
        </Title>
        <Form
          name="signin-form"
          className="login-form"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{ width: '100%' }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="id"
            rules={[{ required: true, message: '아이디를 입력하세요!' }]}
          >
            <Input
              id="userId"
              placeholder="아이디를 입력하세요"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
          >
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: '닉네을 입력하세요!' }]}
          >
            <Input
              id="nickname"
              placeholder="닉네임을 입력하세요"
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%', background: '#80a3ab', color: '#ffffff' }}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </SignUpBox>
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
  background: #80a3ab;
`;

const SignUpBox = styled.div`
  width: 480px;
  height: 650px;
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;
  background: #ffffff;
  border-radius: 0.3rem;
`;

const Title = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 38px;
  margin: 20px 0;
`;

export default SignUp;