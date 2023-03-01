import React from 'react'
import Home from './Components/Home'
import AdminPanel from './Components/Admin/AdminPanel'
import { Routes, Route } from 'react-router-dom'
import State from './context/songs/State'
import PopularTracksTable from './Components/Admin/Tracks/PopularTracksTable'
import Favourites from './Components/Favourites'
import MiddleComponent from './Components/MiddleComponent'
import { useState } from 'react'
import SideBar1 from './Components/SideBar1'
import { useLocation } from 'react-router-dom'
import CreatePlaylist from './Components/CreatePlaylist'
import LoginModal from './Components/LoginModal'
import SignUpModal from './Components/SignUpModal'
import AuthState from './context/auth/AuthState'
import AllPlaylists from './Components/AllPlaylists'
import Newplaylist from './Components/Newplaylist'
import { useNavigate } from 'react-router-dom'
import Alert from './Components/Alert'

const App = () => {
  const [appFavList, setAppFavList] = useState([]);
  const [currentPlaylistSong, setCurrentPlaylistSong] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLogin = () => {
    document.querySelector('.loginModal').classList.toggle('hidden');
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  }


  const [alert, setalert] = useState(null)

  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setalert(null)
    }, 2000);
  };

  return (
    <>
      <AuthState showAlert={showAlert}>
        <State showAlert={showAlert}>
          <div className="main">
            <LoginModal />
            <CreatePlaylist currentPlaylistSong={currentPlaylistSong} setCurrentPlaylistSong={setCurrentPlaylistSong} />
            <Newplaylist currentPlaylistSong={currentPlaylistSong} setCurrentPlaylistSong={setCurrentPlaylistSong} />
            {!(window.location.pathname === '/admin') ? (<SideBar1 />) : ''}

            <div className= {(window.location.pathname === '/admin') ? "components1" : "components"}>
              <Alert alert={alert} />

              {!(window.location.href === 'http://localhost:3000/admin') ? (<div className="login_logout">
                {localStorage.getItem('auth_token') ? (<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleLogout}>Logout</button>
                ) : <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={toggleLogin}>Login</button>}
              </div>) : ''}

              <Routes>
                <Route path='/' element={<Home currentPlaylistSong={currentPlaylistSong} setCurrentPlaylistSong={setCurrentPlaylistSong} showAlert={showAlert} />} />
                <Route path='/signup' element={<SignUpModal showAlert={showAlert} />} />
                <Route path='/admin' element={<AdminPanel showAlert={showAlert} />} />
                <Route path='/admin/populartracks' element={<AdminPanel track="popular" />} />
                <Route path='/admin/dancetracks' element={<AdminPanel track="dance" />} />
                <Route path='/admin/chilltracks' element={<AdminPanel track="chill" />} />
                <Route path='/admin/sadtracks' element={<AdminPanel track="sad" />} />
                <Route path='/admin/workouttracks' element={<AdminPanel track="workout" />} />
                <Route path='/admin/recommendedtracks' element={<AdminPanel track="recommended" />} />
                <Route path='/search' element={<Newplaylist showAlert={showAlert} />} />
                <Route path='/favourites' element={<Favourites appFavList={appFavList} setAppFavList={setAppFavList} showAlert={showAlert} />} />
                <Route path='/playlists' element={<AllPlaylists showAlert={showAlert} />} />
                <Route path='/playlistscreate' element={<Newplaylist showAlert={showAlert} />} />
              </Routes>
            </div>
          </div>
        </State>
      </AuthState>
    </>
  )
}

export default App