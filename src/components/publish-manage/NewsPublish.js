import React from 'react';
import {Table} from 'antd'



const NewsPulish = (props) => {

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`http://localhost:3000/#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title:"作者",
      dataIndex:"author",
    },
    {
      title: '新闻分类',
      dataIndex: 'categoryId',
      render:(categoryId)=>{return <div>{categoryId}</div>}
    },
    {
      title:"操作",
      render:(item)=>{
        return <div>{props.button(item.id)}</div>
      }
    }
  
  ];


  return (
    <div>
      <Table dataSource={props.dataSource} columns={columns} pagination={{pageSize:5}} rowKey={(item)=>item.id}/>
    </div>
  )
}

export default NewsPulish;
