import React from 'react'
import Home from './Components/Home'
import AdminPanel from './Components/Admin/AdminPanel'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
     <div className="main">
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/admin' element={<AdminPanel/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App