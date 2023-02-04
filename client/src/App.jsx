import React from 'react'
import Home from './Components/Home'
import AdminPanel from './Components/Admin/AdminPanel'
import {Routes,Route} from 'react-router-dom'
import State from './context/songs/State'
import PopularTracksTable from './Components/Admin/Tracks/PopularTracksTable'
import Favourites from './Components/Favourites'
import MiddleComponent from './Components/MiddleComponent'
import { useState } from 'react'

const App = () => {
  const [appFavList, setAppFavList] = useState([]);

  return (
    <>
    <State>
     <div className="main">
     <Routes>
     <Route path='/' element={<Home appFavList={appFavList} setAppFavList={setAppFavList}/>}/>
     <Route path='/admin' element={<AdminPanel/>}/>
     <Route path='/admin/populartracks' element={<AdminPanel track="popular"/>}/>
     <Route path='/admin/dancetracks' element={<AdminPanel track="dance"/>}/>
     <Route path='/admin/chilltracks' element={<AdminPanel track="chill"/>}/>
     <Route path='/admin/sadtracks' element={<AdminPanel track="sad"/>}/>
     <Route path='/admin/workouttracks' element={<AdminPanel track="workout"/>}/>
     <Route path='/admin/recommendedtracks' element={<AdminPanel track="recommended"/>}/>
     <Route path='/favourites' element={<Favourites appFavList={appFavList} setAppFavList={setAppFavList}/>}/>
    </Routes>
    </div>
    </State>
    </>
  )
}

export default App