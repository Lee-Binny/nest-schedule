import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const ChatMessage = () => {
  return (
    <MessageWrapper>
      <Avatar style={{ backgroundColor: '#ffbf00', verticalAlign: 'middle', marginRight: '6px' }}>
        테스트
      </Avatar>
      <span style={{ fontWeight: 800, marginRight: '6px' }}>테스트 </span>
      <span>테스트입니다 </span>
    </MessageWrapper>
  )
};

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ChatMessage;