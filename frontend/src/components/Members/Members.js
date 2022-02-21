import React from 'react';
import { Table } from 'antd';

const data = [
  {
    key: '1',
    name: 'John Brown',
    grade: 0,
    color: '#fefefe',
  },
  {
    key: '2',
    name: 'Joe Black',
    grade: 1,
    color: '#rerere',
  },
  {
    key: '3',
    name: 'Jim Green',
    grade: 2,
    color: '#000000',
  },
  {
    key: '4',
    name: 'Jim Red',
    grade: 2,
    color: '#ssssss',
  },
];

const Members = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      width: '20%',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
  ];

  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default Members;