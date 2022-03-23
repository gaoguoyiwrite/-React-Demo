import React,{useState,useEffect,useRef} from 'react';
import {Table,Button,Modal,Switch} from 'antd'
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'

import UserForm from '../../../components/user-manage/UserForm'
const {confirm} = Modal


const Userlist = () => {
  const [dataSource,setDataSource] = useState([])
  const [isAddVisible,setAddVisible] = useState(false)
  const [isUpdateVisible,setisUpdateVisible] = useState(false)
  const [roleList,setRoleList] = useState([])
  const [regionList,setRegionList] = useState([])
  const [updateDisabled,setUpdateDisabled] = useState(false)
  const [current,setCurrent] = useState(0)
  const addForm = useRef()
  const updateForm = useRef()
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters:[
        ...regionList.map(item=>{
          return {
            text:item,
            value:item
          }
        }),
        {
          text:'全球',
          value:'全球'
        }
      ],
      onFilter:(value,item)=>{
        if(value === "全球"){
          return item.region === ""
        }
        return item.region === value
      },
      render:(region)=><b>{region === ""?"全球":region}</b>,
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render:(role)=>{
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(roleState,item)=>{
        return <Switch checked={roleState} disabled={item.default} onChange={()=>{handleChange(item)}} ></Switch>
      }
    },
    {
      title:"操作",
      render:(item)=><div>
        <Button type="danger" shape="circle" icon={<DeleteOutlined />} disabled={item.default} onClick={()=>confirmMethod(item)}></Button>
        <Button type="primary" shape="circle" icon={<EditOutlined /> } disabled={item.default} onClick={()=>handleUpdate(item)}></Button>
      </div>
    }
  ]
  const {roleId,region,username} = JSON.parse(localStorage.getItem("token"))
  useEffect(()=>{
    axios.get('http://localhost:8000/users?_expand=role').then(res=>{
      const list = res.data
      setDataSource(roleId === 1 ? list : [
        ...list.filter(item=>{return item.username === username}),
        ...list.filter(item=>{return item.region === region && item.roleId === 3})
      ])
    })
  },[roleId,region,username])
  
  
  useEffect(()=>{
    axios.get('http://localhost:8000/roles').then(res=>{
      const list = res.data
      setRoleList(list)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:8000/regions').then(res=>{
      const list = res.data
      console.log('regions',list)
      setRegionList(list)
    })
  },[])
  
  const handleChange = (item)=>{
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`http://localhost:8000/users/${item.id}`,{roleState:item.roleState})
  }

  const confirmMethod = (item)=>{
    confirm({
      title: '确认要删除？',
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        deleteMethods(item)
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  }

  const handleUpdate = (item)=>{
    setTimeout(()=>{
      setCurrent(item)
      setisUpdateVisible(true)
      if(item.roleId === 1){
        setUpdateDisabled(true)
      }
      updateForm.current.setFieldsValue(item)
    })
  }

  const deleteMethods = (item)=>{
     setDataSource(dataSource.filter(data=>data.id !== item.id))
     axios.delete(`http://localhost:8000/users/${item.id}`)
  }

  const addFormOK = () =>{
    addForm.current.validateFields().then(value=>{
      setAddVisible(false)
      addForm.current.resetFields()
      axios.post(`http://localhost:8000/users`,{
        ...value,
        "roleState":true,
        "default":false
      }).then(res=>{
        console.log(res)
        setDataSource([...dataSource,{
          ...res.data,
          role:roleList.filter(item=>item.id === res.data.roleId)[0]
        }])
      })
    }).catch(err=>{
      console.log(err)
    })
  }
 
  const updateFormOK = () => {
    updateForm.current.validateFields().then(value=>{
      setisUpdateVisible(false)
      setDataSource(dataSource.map(item=>{
        if(item.id === current.id){
          return {
            ...item,
            ...value,
            role:roleList.filter(data=>data.id === value.roleId)[0]
          }
        }
        return item
      }))
      // setUpdateDisabled(!updateDisabled)
      
      axios.patch(`http://localhost:8000/users/${current.id}`,value)
    })
  }

  return (
    <div>
      <Button type="primary" onClick={()=>{setAddVisible(true)}}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} rowKey={(item)=>{return item.id}} pagination={{pageSize:5}}></Table>
      <Modal
      visible={isAddVisible}
      title="添加用户"
      okText="确定"
      cancelText="取消"
      onCancel={()=>{setAddVisible(false)}}
      onOk={() => {addFormOK()}}
    >
      <UserForm roleList={roleList} regionList={regionList} ref={addForm}></UserForm>
    </Modal>
      <Modal
      visible={isUpdateVisible}
      title="更新用户"
      okText="跟新"
      cancelText="取消"
      onCancel={()=>{
        setisUpdateVisible(false)
        setUpdateDisabled(!updateDisabled)
      }}
      onOk={() => {updateFormOK()}}
    >
      <UserForm roleList={roleList} regionList={regionList} ref={updateForm} updateDisabled={updateDisabled} isUpdate={true}></UserForm>
    </Modal>
    </div>
  );
}

export default Userlist;
