import React from 'react'
import {Form,Input,Button,message} from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./Login.css"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export default function Login() {
  const navigat = useNavigate()
  const onFinish = (values) =>{
    console.log(values)

    axios.get(`http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
      console.log(res)
      if(res.data.length === 0){
        message.error("用户名或密码不匹配")
      }else{
        localStorage.setItem("token",JSON.stringify(res.data[0]))
        navigat('/')
      }
    })
  }
  return (
    <div style={{background:"rgb(35,39,65)",height:"100%"}}>
      <div className="foormContainer">
        <div className="login-title">新闻系统</div>
       <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        key="username"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        key="password"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item key="button">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  )
}
