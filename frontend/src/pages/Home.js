import React, { useState } from 'react';
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

const { Header, Content, Sider } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Calendar');
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onClickMenu = (event) => {
    setSelectedMenu(event.key);
  }

  const menu = (
    <Menu>
      <Menu.Item key="Group1" >
        Group 1
      </Menu.Item>
      <Menu.Item key="2">
        Group 2
      </Menu.Item>
      <Menu.Item key="3">
        Group 3
      </Menu.Item>
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
            Group 1 <DownOutlined />
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
              { selectedMenu === 'Calendar' ? <Calendar/> : selectedMenu === 'Members' ? <Members/> : <ChatRoom/> }
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home;