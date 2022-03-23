import React from 'react';
import NewsPulish from '../../../components/publish-manage/NewsPublish'
import usePublish from "../../../components/publish-manage/usePublish"
import {Button} from 'antd'
const Unpublished = () => {
  
  const {dataSource,handlePublish} = usePublish(1)
  return (
    <div>
      <NewsPulish dataSource={dataSource} button={
        (id)=><Button type="primary" onClick={()=>{handlePublish(id)}}>发布</Button>}>
      </NewsPulish>
    </div>
  );
}

export default Unpublished;