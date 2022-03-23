import {useEffect, useState} from 'react';
import axios from 'axios'

function usePublish(publishState){
  const [dataSource,setDataSource] = useState([])

  const {username} = JSON.parse(localStorage.getItem("token"))
  useEffect(()=>{
    axios.get(`http://localhost:8000/news?auth=${username}&publishState=${publishState}`).then(res=>{
      setDataSource(res.data)
    })
  },[username,publishState])
  
  const handlePublish = (id) => {
    setDataSource(dataSource.filter(item=>item.id!==id))
    axios.patch(`http://localhost:8000/news/${id}`,{
      publishState:2,
      publishTime:Date.now()
    })
  }

  const handleSunset = (id) => {
    setDataSource(dataSource.filter(item=>item.id !== id))
    axios.patch(`http://localhost:8000/news/${id}`,{
      publishState:3,
      publishTime:Date.now()
    })
  }

  const handleDelete = (id) => {
    setDataSource(dataSource.filter(item=>item.id !== id))
    axios.delete(`http://localhost:8000/news/${id}`)
  }

  return {
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete
  }
}

export default usePublish