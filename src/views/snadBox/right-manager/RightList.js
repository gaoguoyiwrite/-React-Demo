import React,{useEffect,useState} from 'react';
import {Table,Tag,Button,Modal,Popover,Switch} from 'antd'
import axios  from 'axios';
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
const {confirm} = Modal


const Rightlist = () => {
  const [dataSource,setDataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/rights?_embed=children').then(res=>{
      const list = res.data
      list.forEach((it)=>{
        if(it.children.length === 0){
          it.children = ""
        }
      })
      setDataSource(list)
    })
  },[])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=><b>{id}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=><Tag color="orange">{key}</Tag>
    },
    {
      title:"操作",
      render:(item)=><div>
        <Button type="danger" shape="circle" icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
        <Popover content={<div style={{textAlign: "center"}}>
          <Switch checked={item.pagepermission} onChange={()=>{handleSwitch(item)}}></Switch>
          </div>} title="配置项" trigger={item.pagepermission === undefined?"":"click"}>
        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermission === undefined}></Button>
        </Popover>
      </div>
    }
  
  ];

  const confirmMethod = (item)=>{
    confirm({
      title: '确认要删除？',
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        deleteMethods(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const deleteMethods = (item)=>{
      setDataSource(dataSource.filter(data=>data.id !== item.id))
      axios.delete(`http://localhost:8000/rights/${item.id}`)
  }

  const handleSwitch = (item)=>{
    item.pagepermission = item.pagepermission === 1 ? 0 : 1
    setDataSource([...dataSource])
    if(item.grade === 1){
      axios.patch(`http://localhost:8000/rights/${item.id}`,{pagepermission:  item.pagepermission})
    }else{
      axios.patch(`http://localhost:8000/children/${item.id}`,{pagepermission:  item.pagepermission})
    }
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}/>
    </div>
  )
}

export default Rightlist;
