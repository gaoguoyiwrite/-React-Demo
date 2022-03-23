import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {Table,Button} from 'antd'

const Audit = () => {
  const  {roleId,username,region} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setDataSource] = useState([])
  useEffect(()=>{
    const roleObj = {
      "1":'superadmin',
      "2":"admin",
      "3":"editor"
    }
    axios.get('http://localhost:8000/news?auditState=1&_expand=category').then(res=>{
      const list =res.data
      setDataSource(roleObj[roleId] === "superadmin"?list:[
        ...list.filter(item=>item.author === username),
        ...list.filter(item=>item.region === region&&roleObj[item.roleId] === 'editor'),
      ])
    })
  },[roleId,username,region])

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,item)=><a href={`http://localhost:3000/#/news-manage/preview/${item.id}`}>{title}</a>
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'categoryId',
    },
    {
      title:"操作",
      render:(item)=><div>
           <Button type="primary" onClick={()=>{handleAudit(item,2,1)}}>通过</Button>
           <Button danger onClick={()=>{handleAudit(item,3,0)}}>驳回</Button>
      </div>
    }
  ]
   
  const handleAudit = (item,auditState,publishState) =>{
    setDataSource(dataSource.filter(data=>data.id !== item.id))

    axios.patch(`http://localhost:8000/${item.id}`,{
      auditState,
      publishState
    })
  }


  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id}/>
    </div>
  );
}

export default Audit;
