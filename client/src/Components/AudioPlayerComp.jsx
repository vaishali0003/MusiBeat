import React, { useState, useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayerComp = (props) => {
    const [playidx, setplayIdx] = useState("");
    const [pauseidx, setpauseIdx] = useState("");
    
    const onpause = () => {
        if(document.querySelector('.play1')){
            setplayIdx(document.querySelector('.play1').id);
            setpauseIdx(document.querySelector('.pause1').id);
            document.querySelector('.play1').classList.remove('play1');
            document.querySelector('.pause1').classList.remove('pause1');
        }
    }

    const onPlay = () => {
        if (document.querySelector('.play1')) {
            if ((document.querySelector('.play1').id !== playidx) && playidx !== "") {
                document.getElementById(playidx).classList.remove('play1')
                document.getElementById(pauseidx).classList.remove('pause1')
            }
            else if ((document.querySelector('.play1').id === playidx)) {
                document.getElementById(playidx).classList.add('play1')
                document.getElementById(pauseidx).classList.add('pause1')
            }
        }
    }

    return (
        <div id="audio_player">
            <AudioPlayer
                onPause={onpause}
                // muted
                src={props.audiourl}
                onPlay={onPlay}
            />
        </div>
    )
}

export default AudioPlayerComp