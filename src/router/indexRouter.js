import React from 'react';
import {Routes,Route} from 'react-router-dom'
import Login  from '../views/Login/Login';
import NewsSandBox from '../views/snadBox/NewsSandBox';

const Indexrouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/*" element={<NewsSandBox />}/>
    </Routes>
  );
}

export default Indexrouter;
