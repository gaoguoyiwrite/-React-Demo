import React, { forwardRef,useState,useEffect } from 'react';
import {Form,Input,Select} from 'antd'

const {Option} = Select

const Userform = forwardRef((props,ref) => {
  const [isDisabled,setIsDisabled] = useState(false)
  const {roleId,region} = JSON.parse(localStorage.getItem("token"))
  const checkRegionDisabled = (item)=>{
    if(props.isUpdate){
      if(roleId === 1){
        return false
      }else{
        return true
      }
    }else{
      if(roleId === 1){
        return false
      }else{
        return item.value !== region
      }
    }
  }

  const checkRoleDisabled = (item)=>{
    if(props.isUpdate){
      if(roleId === 1){
        return false
      }else{
        return true
      }
    }else{
      if(roleId === 1){
        return false
      }else{
        return item.id !== 3
      }
    }
  }
  useEffect(()=>{
    setIsDisabled(props.updateDisabled)
  },[props.updateDisabled])
  return (
    <div>
       <Form layout="vertical" ref={ref}>
        <Form.Item name="username" label="用户名" rules={[{required: true,message:'plaset input'}]}>
          <Input/>
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{required: true,message:'plaset input'}]}>
          <Input/>
        </Form.Item>
       
        <Form.Item name="region" label="区域" rules={isDisabled?[]:[{required: true,message:'plaset input'}]}>
          <Select disabled = {isDisabled}>
            {
              props.regionList.map(item=>{
               return <Option value={item} key={item} disabled={()=>checkRegionDisabled(item)}>{item}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name="roleId" label="角色" rules={[{required: true,message:'plaset input'}] }>
        <Select onChange={(value)=>{if(value === 1){
          setIsDisabled(true)
          ref.current.setFieldsValue({region:""})
        }else{
          setIsDisabled(false)
        }
        }}>
            {
              props.roleList.map(item=>{
               return <Option value={item.id} key={item.id} disabled={()=>checkRoleDisabled(item)}>{item.roleName}</Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
})

export default Userform;
