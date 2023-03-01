import React, { useContext ,useState,useEffect} from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SideBar1 from './SideBar1';
import AudioPlayerComp from './AudioPlayerComp';
import Context from '../context/auth/Context';

const Favourites = (props) => {
    const context = useContext(Context);
   const [fav, setFav] = useState([]);
   const [audiourl, setaudiourl] = useState("");

    const getallfavourites = async () => {
        const getfav = await context.getfavourites();
        console.log(getfav);
        setFav(getfav);
    }

    useEffect(() => {
     if(localStorage.getItem('auth_token')){
      getallfavourites();
     }
    }, [])

    const playsong = (url, index) => {
     setaudiourl(url);
     if (document.querySelector('.play1')) {
         document.querySelector('.rhap_play-pause-button').click();
         let fg = false;
         if (document.querySelector('.play1').id !== `play${index}`) {
             fg = true;
         }

         document.querySelector('.play1').classList.remove('play1');
         document.querySelector('.pause1').classList.remove('pause1');

         if (fg) {
             document.getElementById(`pause${index}`).classList.add('pause1');
             document.getElementById(`play${index}`).classList.add('play1');
         }
     }
     // to play the music
     else {
         document.querySelector('.rhap_play-pause-button').click();
         document.getElementById(`pause${index}`).classList.add('pause1');
         document.getElementById(`play${index}`).classList.add('play1');
     }
     document.getElementById('audio_player').style.display = 'block';
 }

    return (
        <>
          {localStorage.getItem('auth_token') ? (
           <>
             <div className="favourite_songs_div">
             <Splide
                 options={{
                     rewind: true,
                     gap: '1rem',
                     perPage: 8,
                     height: '15rem'
                 }}
                 aria-label="My Favorite Images"
             >
                  {fav.length!==0 ?
                     fav.map((item, index) => {
                         return (
                             <SplideSlide key={index}>
                                  <div className="img_part">
                                                     <img src={"https://" + item.img_url} alt="pict" style={{ 'borderRadius': '5px' }} />
                                                     <div className="music_player" onClick={() => { playsong(item.song_url, index) }}>
                                                         <img src="assets/pause1.png" className='play_pause_img pause' id={`pause${index}`} alt="pict" />
                                                         <img src="assets/play1.png" className='play_pause_img play' id={`play${index}`} alt="pict" />
                                                     </div>
                                                 </div>
                                 <p className="song_name_p1" style={{ 'marginBottom': 0 }}>{item.title}</p>
                                 <p className="movie_name_p1">{item.artist}</p>
                             </SplideSlide>
                         )
                     })
                     :
                     <h1>Nothing to show</h1>
                 }
             </Splide>
         </div>
         <AudioPlayerComp audiourl={audiourl} />
         </>
          ):(
           <div className="login_to_view">
            <div className="img_login">
<img src="login_to_continue.png" alt="" srcSet="" />
            </div>
          <h1>Please Login To view favourites !!</h1>
          </div>
          )}
         </>
    )
}

export default Favourites