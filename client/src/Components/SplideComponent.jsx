import React, { useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import AudioPlayerComp from './AudioPlayerComp';

const SplideComponent = (props) => {

    const [favList, setFavList] = useState([]);
    const [flag, setFlag] = useState(false);

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
        setFavList(favList.concat(item));
        props.setAppFavList(favList);
    }

    return (
        <div className="popular_hits">
            <h4 className="song_cat_txt">{props.cat} Tracks</h4>
            <Splide
                options={{
                    rewind: true,
                    gap: '1rem',
                    perPage: 8,
                    height: '15rem'
                }}
                aria-label="My Favorite Images"
            >
                {props.songarr.map((item, index) => {
                    if (item.category === props.cat) {
                        return (
                            <SplideSlide key={index}>
                                <div className="img_part">
                                    <img src={"https://" + item.img_url} alt="pict" style={{ 'borderRadius': '5px' }} />
                                    <div className="fav_part" onClick={() => { addFav(item, index) }}>
                                        <img src="add_fav.png" className='add_remove_fav' id={`add_fav${index}`} alt="pict" />
                                        {/* <img src="remove_fav.png" className='add_remove_fav' id={`remove_fav${index}`} alt="pict"/> */}
                                    </div>
                                    <div className="music_player" onClick={() => { playsong(item.song_url, index) }}>
                                        <img src="assets/pause1.png" className='play_pause_img pause' id={`pause${index}`} alt="pict" />
                                        <img src="assets/play1.png" className='play_pause_img play' id={`play${index}`} alt="pict" />
                                    </div>
                                </div>
                                <p className="song_name_p1" style={{ 'marginBottom': 0 }}>{item.title}</p>
                                <p className="movie_name_p1">{item.artist}</p>
                            </SplideSlide>
                        )
                    }
                })}
            </Splide>
        </div>
    )
}

export default SplideComponent
