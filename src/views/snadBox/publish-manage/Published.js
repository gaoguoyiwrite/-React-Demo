import React from 'react';
import NewsPulish from '../../../components/publish-manage/NewsPublish'
import usePublish from "../../../components/publish-manage/usePublish"
import {Button} from 'antd'
const Published = () => {
  
  const {dataSource,handleSunset} = usePublish(2)
  return (
    <div>
      <NewsPulish dataSource={dataSource}  button={
        (id)=><Button type="danger" onClick={()=>handleSunset(id)}>下线</Button>}>
      </NewsPulish>
    </div>
  );
}

export default Published;