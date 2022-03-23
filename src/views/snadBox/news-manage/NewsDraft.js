import React,{useEffect,useState} from 'react';
import {Table,Button,Modal,notification} from 'antd'
import {useNavigate} from 'react-router-dom'
import axios  from 'axios';
import { DeleteOutlined,EditOutlined,ExclamationCircleOutlined,UploadOutlined } from '@ant-design/icons';
const {confirm} = Modal


const NewsDraft = () => {
  const [dataSource,setDataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem("token"))
  const navigat = useNavigate()
  useEffect(()=>{
    axios.get(`http://localhost:8000/news?author=${username}&auditState=0`).then(res=>{
      const list = res.data
      console.log(list)
      setDataSource(list)
    })
  },[username])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=><b>{id}</b>
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`http://localhost:3000/#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
    },
    {
      title:"操作",
      render:(item)=><div>
        <Button type="danger" shape="circle" icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{navigat(`/news-manage/edit/${item.id}`)}}></Button>
        <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={()=>{handleCheck(item.id)}}></Button>
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
      axios.delete(`http://localhost:8000/news/${item.id}`)
  }
  
  const handleCheck = (id) => {
    axios.patch(`http://localhost:8000/news/${id}`,{
      auditState:1
    }).then(res=>{
      navigat('/audit-manage/list')
      notification.info({
        message: `通知`,
        description:`请到审核列表中查看`,
        placement:"bottomRight",
      });
    })
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id}/>
    </div>
  )
}

export default NewsDraft;
