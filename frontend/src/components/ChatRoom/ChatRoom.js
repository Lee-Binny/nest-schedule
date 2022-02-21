import React from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ChatMessage from "./ChatMessage";

const ChatRoom = () => {
  return (
    <ChatContainer>
      <ChatWrapper>
        <ChatMessage/>
      </ChatWrapper>
      <Input.Group compact>
        <Input style={{ width: 'calc(100% - 45px)' }} placeholder="메세지를 입력하세요." />
        <Button type="primary"><SendOutlined /></Button>
      </Input.Group>
    </ChatContainer>
  )
};

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 16px;
`;

const ChatWrapper = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column-reverse;
  padding: 10px 0;
`;

export default ChatRoom;