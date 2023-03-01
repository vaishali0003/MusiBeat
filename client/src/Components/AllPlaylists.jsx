import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/auth/Context'
import AudioPlayerComp from './AudioPlayerComp';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import LoginModal from './LoginModal';

const AllPlaylists = (props) => {
    const context = useContext(Context);
    const [playlists, setPlaylists] = useState([]);
    const [audiourl, setaudiourl] = useState("");
    const [flag, setFlag] = useState(false);
    
    const getalltheplaylists = async () => {
        const all_playlists = await context.getallplaylists();
        setPlaylists(all_playlists);
    }

    useEffect(() => {
        getalltheplaylists();
    }, [flag])


    const playsong = (url, index, name) => {
        setaudiourl(url);
        if (document.querySelector('.play1')) {
            document.querySelector('.rhap_play-pause-button').click();
            let fg = false;
            if (document.querySelector('.play1').id !== `play${index}${name}`) {
                fg = true;
            }

            document.querySelector('.play1').classList.remove('play1');
            document.querySelector('.pause1').classList.remove('pause1');

            if (fg) {
                document.getElementById(`pause${index}${name}`).classList.add('pause1');
                document.getElementById(`play${index}${name}`).classList.add('play1');
            }
        }
        // to play the music
        else {
            document.querySelector('.rhap_play-pause-button').click();
            document.getElementById(`pause${index}${name}`).classList.add('pause1');
            document.getElementById(`play${index}${name}`).classList.add('play1');
        }
        document.getElementById('audio_player').style.display = 'block';
    }

    const deletesong = async(id1, id2) => {
        const data=await context.deletesongs(id1,id2);
        if(data.success){
            setFlag(!flag);
            props.showAlert('Song deleted from playlist successfully','success');
        }
        else{
            props.showAlert(data.message,data.type);
        }
    }

    return (
        <>
            {localStorage.getItem('auth_token') ? (
                <div className="all_playlists">
                    <div className="all_playlists_section">
                        {playlists ? playlists.map((item, index) => {
                            return (
                                <div className="playlist_div" key={index}>
                                    <h1 className="h1_playlist_head">{item.name}</h1>

                                    {item.songs.length !== 0 ? (
                                        <Splide
                                            options={{
                                                rewind: true,
                                                gap: '1rem',
                                                perPage: 7,
                                                minHeight: '20rem'
                                            }}
                                            aria-label="Playlists"
                                        >
                                            {item.songs.map((item1, index1) => {
                                                return (
                                                    <SplideSlide key={index1}>
                                                        <div className="img_part img_part_playlist">
                                                            <img src={"https://" + item1.img_url} alt="pict" style={{ 'borderRadius': '5px' }} />
                                                            <div className="remove_playlist_part" onClick={() => { deletesong(item1._id, item._id) }}>
                                                                <img src="minus.png" alt="" srcSet="" />
                                                            </div>
                                                            <div className="music_player" onClick={() => { playsong(item1.song_url, index1, item.name) }}>
                                                                <img src="assets/pause1.png" className='play_pause_img pause' id={`pause${index1}${item.name}`} alt="pict" />
                                                                <img src="assets/play1.png" className='play_pause_img play' id={`play${index1}${item.name}`} alt="pict" />
                                                            </div>
                                                        </div>
                                                        <div className="subtext">
                                                            <div className="subtext1">
                                                                <p className="song_name_p1" style={{ 'marginBottom': 0 }}>{item1.title}</p>
                                                                <p className="artist_name_p1">{item1.artist}</p>
                                                            </div>
                                                        </div>
                                                    </SplideSlide>
                                                )
                                            })
                                            }
                                        </Splide>
                                    ) : (<div className="regret_message1">No songs to show !!</div>)}
                                </div>
                            )
                        }) : (<div className="regret_message">No playlists to show !!</div>)}
                    </div>
                    <AudioPlayerComp audiourl={audiourl} />
                </div>
            ) : (
                <div className="login_to_view">
                    <div className="img_login">
                        <img src="login_to_continue.png" alt="" srcSet="" />
                    </div>
                    <h1>Please Login To view Playlists !!</h1>
                </div>
            )}
        </>
    )
}

export default AllPlaylists