import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'

import SideMenu from '../../components/sandBox/SideMenu'
import TopHeader from '../../components/sandBox/TopHeader'
import Home from '../snadBox/home/Home'
import UserList from '../snadBox/user-manager/UserList'
import RoleList from '../snadBox/right-manager/RoleList'
import RightList from '../snadBox/right-manager/RightList'
import Nopermission from '../snadBox/noPermission/Nopermission'
import NewsAdd from "./news-manage/NewsAdd"
import NewsDraft from "./news-manage/NewsDraft"
import NewsCategory from './news-manage/NewsCategory'
import NewsPreview from './news-manage/NewsPreview'
import NewsUpdate from './news-manage/NewsUpdate'
import Auditlist from './audit-manage/AuditList'
import Audit from './audit-manage/Audit'
import Published from './publish-manage/Published'
import Unpublished from './publish-manage/Unpublished'
import Sunset from './publish-manage/Sunset'
import { Spin } from 'antd';
import './NewsSandBox.css'
import { Layout } from 'antd';
import {connect} from 'react-redux'
const { Content } = Layout;

 function sandBox(props) {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow:"auto"
            }}
          >
          <Spin size="large" spinning={props.isLoading}>
          <Routes>
            <Route path="/" element={<Navigate to="home"/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/user-manage/list' element={<UserList/>}/>
            <Route path='/right-manage/role/list' element={<RoleList/>}/>
            <Route path='/right-manage/right/list' element={<RightList/>}/>
            <Route path='/news-manage/update/:id' element={<NewsAdd/>}/>
            <Route path='/news-manage/draft' element={<NewsDraft/>}/>
            <Route path='/news-manage/category' element={<NewsCategory/>}/>
            <Route path='/news-manage/preview/:id' element={<NewsPreview/>}/>
            <Route path='/news-manage/edit/:id' element={<NewsUpdate/>}/>
            <Route path='/audit-manage/audit' element={<Audit/>}/>
            <Route path='/audit-manage/list' element={<Auditlist/>}/>
            <Route path='/publish-manage/published' element={<Published/>}/>
            <Route path='/publish-manage/unpublished' element={<Unpublished/>}/>
            <Route path='/publish-manage/sunset' element={<Sunset/>}/>
            <Route path="*" element={<Nopermission />}/>
          </Routes>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}


const mapStateToProps=({LoadingReducer:{isLoading}}) => {
  return {
    isLoading
  }
}

export default connect(mapStateToProps)(sandBox)
