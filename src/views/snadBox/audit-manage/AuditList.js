import React,{useEffect,useState} from 'react';
import {Table,Button,Tag,notification} from 'antd'
import { } from '@ant-design/icons';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const Auditlist = () => {
  const navigat = useNavigate()
  const [dataSource,setDataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem("token"))
  useEffect(()=>{
    axios.get(`http://localhost:8000/news?author=${username}&auditState_ne=0&publishState_lte=1`).then(res=>{
      setDataSource(res.data)
    })
  },[username])


  
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,item)=><a href={`http://localhost:3000/#/news-manage/preview/${item.id}`}>{title}</a>
    },
    {
      title: '作责',
      dataIndex: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'categoryId',
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render:(auditState)=>{
        const colorList = ["","orange","green","red"]
        const auditList = ["草稿箱","审核中","已通过","未通过"] 
       return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
    }
    },
    {
      title:"操作",
      render:(item)=><div>
        {
          item.auditState === 1 &&  <Button danger onClick={()=>{handleRevert(item)}}>撤销</Button>
        }
        {
          item.auditState === 2 &&  <Button onClick={()=> {handlePulic(item)}}>发布</Button>
        }
        {
          item.auditState === 3 &&  <Button type="primary" onClick={()=>{handleUpdate(item)}}>更新</Button>
        }
      </div>
    }
  ]

  const handleRevert = (item) =>{
    setDataSource(dataSource.filter(data=>data.id !== item.id))
    axios.patch(`http://localhost:8000/news/${item.id}`,{
      auditState:0
    })
  }

  const handleUpdate = (item) =>{
    window.history.push(`/news-manage/edit/${item.id}`)
  }

  const handlePulic = (item) => {
    axios.patch(`http://localhost:8000/news/${item.id}`,{
      publishState:2,
      publishTime:Date.now()
    }).then(res=>{
      navigat("/publish-manage/published")

      notification.info({
        message: `通知`,
        description:`请到发布管理中查看`,
        placement:"bottomRight",
      });
    })
  }

  return (
    <div>
       <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id}/>
    </div>
  );
}

export default Auditlist;  
