import React from 'react';
import NewsPulish from '../../../components/publish-manage/NewsPublish'
import usePublish from "../../../components/publish-manage/usePublish"
import {Button} from 'antd'
const Sunset = () => {
  
  const {dataSource,handleDelete} = usePublish(3)
  return (
    <div>
      <NewsPulish dataSource={dataSource} button={(id)=><Button type="danger" onClick={()=>handleDelete(id)}>删除</Button>}></NewsPulish>
    </div>
  );
}

export default Sunset;