import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import { Layout,Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import './index.css'
const { Sider } = Layout;
const { SubMenu } = Menu;


const Sidemenu = (props) => {
  const [menu,setMenu] = useState([])
  const location = useLocation()
  const selectKeys = [location.pathname]
  const openKeys = ['/'+location.pathname.split('/')[1]]
  console.log(location)
  useEffect(()=>{
    axios.get("http://localhost:8000/rights?_embed=children").then(res=>{
      console.log(res)
      setMenu(res.data)
  })
},[])
    
  const navigat = useNavigate()
  
  const {role:{rights}} = JSON.parse(localStorage.getItem("token"))
  const checkPagePermission =(item)=>{
    return item.pagepermission === 1 && rights.includes(item.key)
  }

  const renderMenu = (menuList) =>{
    return menuList.map(item=>{
      if(item.children?.length>0 && checkPagePermission(item)){
        return <SubMenu key={item.key} icon={<UserOutlined/>} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      return checkPagePermission(item) && <Menu.Item key={item.key} icon={<UserOutlined/>} onClick={()=>{navigat(item.key)}}>{item.title}</Menu.Item>
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollApsed} >
      <div style={{display:"flex",flexDirection: "column",height: "100%"}}>
        <div className="logo" >NEWS SYSTEM</div>
        <div style={{flex:"1",overflow:"auto"}}>
          <Menu theme='dark' mode='inline' selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
          {renderMenu(menu)}
          </Menu>
        </div>
      </div>
  </Sider>
  );
}

const mapStateToProps=({CollApsedReducer:{isCollApsed}}) => {
  return {
    isCollApsed
  }
}

export default connect(mapStateToProps)(Sidemenu);
