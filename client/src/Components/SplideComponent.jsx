import React, { useState, useEffect, useContext } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AudioPlayerComp from './AudioPlayerComp';
import Context from '../context/auth/Context';

const SplideComponent = (props) => {
    const context = useContext(Context);
    const [flag, setFlag] = useState(false);

    const openCreateplaylist = (song) => {
        document.querySelector('.createplaylist').classList.toggle('hidden');
        props.setCurrentPlaylistSong(song);
        console.log(props.currentPlaylistSong);
    }

    const playsong = (url, index) => {
        props.setaudiourl(url);

        // to pause the music
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

    const addFav = (item, index) => {
        context.addToFavourites(item);
        console.log('song added to favourites');
        localStorage.setItem(`${props.cat}isFav${index}`, true);
    }

    const removeFav = (item, index) => {
        context.removeFavourites(item._id);
        console.log('song removed from favourites');
        localStorage.removeItem(`${props.cat}isFav${index}`);
    }

    const touppercase = (str) => {
        return str.toUpperCase();
    }

    return (
        <div className="popular_hits">
            <h4 className="song_cat_txt">{touppercase(props.cat)} TRACKS</h4>
            <Splide
                options={{
                    rewind: true,
                    gap: '1rem',
                    perPage: 7,
                    minHeight: '20rem'
                }}
                aria-label="My Favorite Images"
            >
                {props.songarr.map((item, index) => {
                    if (item.category === props.cat) {
                        return (
                            <SplideSlide key={index}>
                                <div className="img_part">
                                    <img src={"https://" + item.img_url} alt="pict" style={{ 'borderRadius': '5px' }} />
                                    {localStorage.getItem('auth_token') ? (<div className="fav_part">
                                        {!localStorage.getItem(`${props.cat}isFav${index}`) ? (<img src="add_fav.png" className='add_remove_fav add' id={`add_fav${index}`} alt="pict" onClick={() => { addFav(item, index) }} />) : (<img src="remove_fav.png" className='add_remove_fav remove' id={`remove_fav${index}`} alt="pict" onClick={() => { removeFav(item, index) }} />)}
                                    </div>) : ''}
                                    <div className="music_player" onClick={() => { playsong(item.song_url, index) }}>
                                        <img src="assets/pause1.png" className='play_pause_img pause' id={`pause${index}`} alt="pict" />
                                        <img src="assets/play1.png" className='play_pause_img play' id={`play${index}`} alt="pict" />
                                    </div>
                                </div>
                                <div className="subtext">
                                    <div className="subtext1">
                                        <p className="song_name_p1">{item.title}</p>
                                        <p className="artist_name_p1">{item.artist}</p>
                                    </div>
                                    {localStorage.getItem('auth_token')?( <div className="subtext2" onClick={() => { openCreateplaylist(item) }}>
                                        <img src="plus1.png" />
                                    </div>):('')}
                                </div>
                            </SplideSlide>
                        )
                    }
                })}
            </Splide>
        </div>
    )
}

export default SplideComponent
