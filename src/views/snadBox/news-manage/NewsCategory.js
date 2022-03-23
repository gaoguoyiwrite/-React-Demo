import React,{useEffect,useState} from 'react';
import {Table,Button,Modal} from 'antd'
import axios  from 'axios';
import { DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
const {confirm} = Modal


const NewsCategory = () => {
  const [dataSource,setDataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/categories').then(res=>{
      const list = res.data
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
      title: '栏目名称',
      dataIndex: 'title'
    },
    {
      title:"操作",
      render:(item)=><div>
        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
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
      axios.delete(`http://localhost:8000/categories/${item.id}`)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id}/>
    </div>
  )
}

export default NewsCategory;
