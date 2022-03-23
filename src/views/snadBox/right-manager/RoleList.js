import React,{useState,useEffect} from 'react';
import {Table,Button,Modal,Tree } from 'antd'
import { DeleteOutlined,OrderedListOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const {confirm} = Modal


const Rolelist = () => {
  const [dataSource,setDataSource] = useState([])
  const [rightList,setRightList] = useState([])
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [currentRight,setCurrentRight] = useState([])
  const [currentId,setCurrentId] = useState(0)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=><b>{id}</b>,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title:"操作",
      render:(item)=><div>
        <Button type="danger" shape="circle" icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
        <Button type="primary" shape="circle" icon={<OrderedListOutlined />} 
        onClick={()=>{setIsModalVisible(true);setCurrentRight(item.rights);setCurrentId(item.id)}}>
        </Button>
      </div>
    }
  ]

  useEffect(()=>{
    axios.get('http://localhost:8000/roles').then(res=>{
      const list = res.data
      setDataSource(list)
    })
  },[])
  useEffect(()=>{
    axios.get('http://localhost:8000/rights?_embed=children').then(res=>{
      const list = res.data
      setRightList(list)
    })
  },[])

  const confirmMethod = (item)=>{
    confirm({
      title: '确认要删除？',
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        deleteMethods(item)
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  }

  const deleteMethods = (item)=>{
      setDataSource(dataSource.filter(data=>data.id !== item.id))
      axios.delete(`http://localhost:8000/roles/${item.id}`)
  }

  const handleOk = ()=>{
    setIsModalVisible(false)
    setDataSource(dataSource.map(item=>{
      if(item.id === currentId){
        return {
          ...item,
          rights:currentRight
        }
      }
      return item
    }))
    axios.patch(`http://localhost:8000/roles/${currentId}`,{rights:currentRight})
  }
  const handleCancel = () =>{
    setIsModalVisible(false)
  }

  const onCheck = (checkKeys)=>{
    setCurrentRight(checkKeys.checked)
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item)=>{return item.id}}></Table>
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <Tree checkable treeData={rightList} checkedKeys={currentRight} onCheck={onCheck} checkStrictly={true}></Tree>
      </Modal>
    </div>
  );
}

export default Rolelist;
