import React from 'react';
import {useNavigate} from 'react-router-dom'
import { Layout,Menu,Dropdown,Avatar} from 'antd';
import {MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'

const { Header,} = Layout;


const Topheader = (props) => {
  console.log('topheader',props)
  const navigat = useNavigate()

  const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))
  const changeCollapsed= () =>  {props.changeCollapsed()}
  const menu = (
    <Menu>
      <Menu.Item>
        {roleName}
      </Menu.Item>
      <Menu.Item danger onClick={() =>{
        localStorage.removeItem("token")
        navigat("/login")
      }}>退出</Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
    {
      props.isCollApsed ? <MenuUnfoldOutlined onClick={() => changeCollapsed()}/> : <MenuFoldOutlined  onClick={() => changeCollapsed()}/>
    }

    <div style={{float:'right'}}>
      <span>欢迎<span style={{color:"#1890ff"}}>{username}</span>回来</span>
      <Dropdown overlay={menu}>
      <Avatar size="large" icon={<UserOutlined />} />
      </Dropdown>
    </div>
    
  </Header>
  )
}

const mapStateToProps=({CollApsedReducer:{isCollApsed}}) => {
  return {
    isCollApsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
    return {
      type:"change_collapsed"
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Topheader);
