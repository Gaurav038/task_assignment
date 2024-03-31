import React from 'react'
import { Route, Routes } from "react-router-dom";
import Alltask from '../Pages/Alltask';
import AddTask from './Addtask';
import Updatetask from './Updatetask';
const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Alltask/>} />
      <Route path="/add" element={<AddTask/>}/>
      <Route path="/update-task/:taskId" element={<Updatetask/>}/>
    </Routes>
  )
}

export default Mainroutes




