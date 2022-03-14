import React from 'react';
import { Modal, Input } from 'antd';
import GroupAPI from '../../apis/group'

const { Search } = Input;

const JoinGroupModal = ({ show, onClose }) => {
  const onOK = () => {
    onClose();
  };

  const onSearch = async (value) => {
    const res = await GroupAPI.searchGroup({ name: value });
    console.log(res);
  };

  return (
    <Modal
      title="그룹 가입하기"
      visible={show}
      okButtonProps={{ style: { display: 'none' } }}
      cancelText="취소"
      onCancel={onClose}
    >
      <Search
        placeholder="검색할 그룹을 입력하세요."
        allowClear
        enterButton="검색"
        onSearch={onSearch}
      />
    </Modal>
  )
};

export default JoinGroupModal;