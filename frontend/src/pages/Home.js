import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  MessageOutlined,
  DownOutlined
} from '@ant-design/icons';
import Calendar from "../components/Calendar/Calendar";
import Members from "../components/Members/Members";
import ChatRoom from "../components/ChatRoom/ChatRoom";
import GroupAPI from '../apis/group';
import JoinGroup from '../components/Group/JoinGroup';

const { Header, Content, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Calendar');
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onClickMenu = (event) => {
    setSelectedMenu(event.key);
  };

  useEffect(async () => {
    if (!localStorage.getItem('token')) {
      document.location.href = '/signin';
    } else {
      const res = await GroupAPI.getMyGroups();
      setGroups(res.groups);
      if (res.groups.length > 0) {
        setSelected(res.groups[0]);
      }
    }
  }, []);

  const menu = (
    <Menu>
      { groups.length > 0 && (
        groups.map(group => {
          return (
            <Menu.Item key={group.id} >
              {group.name}
            </Menu.Item>
          )
        })
      )}
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh'}}>
      <Header className="site-layout-background" style={{ padding: 0 }} >
        <Dropdown overlay={menu}>
          <Button style={{
            width: '180px',
            margin: '10px',
            textAlign: 'left',
            background: 'transparent',
            color: '#ffffff',
            border: 'none',
            fontSize: '18px',
            fontWeight: 800,
          }}>
            { selected && (
              selected.name
            )} <DownOutlined />
          </Button>
        </Dropdown>
      </Header>
      <Layout style={{ height: 'calc(100% - 64px)' }}>
        <Sider collapsible style={{ backgroundColor: '#fafafa' }} collapsed={collapsed} onCollapse={onCollapse} >
          <Menu theme="light" defaultSelectedKeys={[selectedMenu]} onClick={onClickMenu} mode="inline">
            <Menu.Item key="Calendar" icon={<CalendarOutlined />}>
              Calendar
            </Menu.Item>
            <Menu.Item key="Members" icon={<TeamOutlined />}>
              Members
            </Menu.Item>
            <Menu.Item key="ChatRoom" icon={<MessageOutlined />}>
              ChatRoom
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ backgroundColor: '#ffffff' }}>
          <Content style={{ margin: '0 16px', backgroundColor: '#ffffff' }}>
            <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
              { !selected ? <JoinGroup /> : selectedMenu === 'Calendar' ? <Calendar/> : selectedMenu === 'Members' ? <Members/> : <ChatRoom/> }
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
};

export default Home;