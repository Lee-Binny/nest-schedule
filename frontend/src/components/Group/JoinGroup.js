import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import JoinGroupModal from '../Common/JoinGroupModal';

const JoinGroup = () => {
  const [show, setShow] = useState(false);
  const onOpen = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <JoinGroupWrapper>
      <Button type="primary" onClick={onOpen}>그룹 가입하기</Button>
      <JoinGroupModal show={show} onClose={onClose} />
    </JoinGroupWrapper>
  )
};

const JoinGroupWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default JoinGroup;