import React,{useState,useEffect,useRef} from 'react';
import {PageHeader,Steps,Button,Form,Input,Select,message,notification} from 'antd'
import style from './News.module.css'
import axios from 'axios'
import NewsEditor from '../../../components/news-manage/NewsEditor';
import {useNavigate,useParams} from "react-router-dom"
const {Step} = Steps
const {Option} = Select



const NewsUpdate = () => {
  const navigat = useNavigate()
  const [current,setCurrent] = useState(0)
  const [categoryList,setcategoryList] = useState([])
  const [formInfo,setFormInfo] = useState({})
  const [content,setContent] = useState("")
  const NewsForm = useRef(null)
  const {id} = useParams()
  
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/news/${id}?_expand=role`).then(res=>{
      //setNewsInfo(res.data)
      let {title,categoryId,content} = res.data
      NewsForm.current.setFieldsValue({
        title,
        categoryId
      })
      setContent(content)
    })
  },[id])

  const handleNext = () => {
    if(current === 0 ){
      NewsForm.current.validateFields().then(res=>{
        console.log(res)
        setFormInfo(res)
        setCurrent(current+1)
      }).catch(error=>{
        console.log(error)
      })
    }else{
      if(content === "" || content.trim() === "<p></p>"){
        message.error("新闻内容不能为空")
      }else{
        setCurrent(current+1)
      }
    }
  }
  const handlePrevious = () => {
    setCurrent(current-1)
  }
  const user = JSON.parse(localStorage.getItem("token"))

  const handleSave = (auditState)=>{
    axios.patch(`http://localhost:8000/news/${id}`,{
      ...formInfo,
      "content":content,
      "region":user.region?user.region:"全球",
      "auditState":auditState,
    }).then(res=>{
      navigat(auditState===0?"/news-manager/draft":"/autid-manage/list")

      notification.info({
        message: `通知`,
        description:`请到${auditState===0?'草稿箱':'审核列表'}中查看`,
        placement:"bottomRight",
      });
    })
  }


  const layout = {
    labelCol:{span:4},
    wrapperCol:{span:20},
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/categories').then(res=>{
      setcategoryList(res.data)
    })
  },[])


  return (
    <div >
      <PageHeader
        className="site-page-header"
        title="编辑新闻"
        onBack={() => window.history.back()}
        subTitle="This is a subtitle" />
        <Steps current={current}>
          <Step title="基本信息" description="新闻标题，新闻分类" />
          <Step title="新闻内容" description="新闻主体内容" />
          <Step title="新闻提交" description="保存草稿或者提交审核" />
        </Steps>
        <div style={{marginTop:"50px"}}>
        <div className={current===0?"":style.active} >
        <Form
          name="basic"
          {...layout}
          ref={NewsForm}
         >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                {categoryList.map(item=>{
                  return <Option value={item.value} key={item.id}></Option>
                })}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current===1?"":style.active}>
         <NewsEditor getContent={(value)=>{setContent(value)}} content={content}></NewsEditor>
        </div>
        <div className={current===2?"":style.active}>
        </div>
        </div>
        <div style={{marginTop:"50px"}}>
          {current === 2 && <span>
            <Button type="primary" onClick={()=>handleSave(0)}>保存草稿箱</Button>  
            <Button danger onClick={()=>handleSave(1)}>提交审核</Button>  
          </span>}
          {current<2 && <Button type="primary" onClick={handleNext}>下一步</Button>}
          {current>0 && <Button type="primary" onClick={handlePrevious}>上一步</Button>}
        </div>
    </div>
  );
}

export default NewsUpdate;
