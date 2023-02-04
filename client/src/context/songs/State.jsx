import React, { useState } from "react";
import Context from "./Context";

const State = (props) => {
    // const host = 'http://localhost:5100';
    const [flag, setflag] = useState(true);

    // add song
    const addSong = async (songAudio, category) => {
        let formData = new FormData()
        formData.append('songAudio', songAudio);
        formData.append('category', category);
        try {
            // API CALL
            const response = await fetch('http://localhost:5100/uploadis/addsong', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            // setsongs(songs.concat(data));
            console.log('song added successfully');
        }
        catch (err) {
            console.log(err);
            console.log('some internal error occured');
        }
    }


    // fetch all songs
    const getallsongs = async (categ,val) => {
        try {
            // API CALL
            const response = await fetch(`http://localhost:5100/uploadis/getallsongs?category=${categ}&search=${val}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
            console.log('some internal error occured');
        }
    }


    const editNote = async (id, title, artist, category) => {
        try {
            // API CALL
            const response = await fetch(`http://localhost:5100/uploadis/editsong/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, artist, category })
            })
            const data = await response.json();
            console.log(data);
        }
        catch (err) {
            console.log(err);
            console.log('some internal error occured')
        }
    }

    const deleteNote = async (id) => {
        try {
            setflag(true);
            const response = await fetch(`http://localhost:5100/uploadis/deletesong/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            if(data){
                setflag(false);
            }
        }
        catch (err) {
            console.log(err);
            console.log('some internal error occured');
        }
    }

    return (
        <Context.Provider value={{ addSong, getallsongs, editNote, deleteNote ,flag}}>
            {props.children}
        </Context.Provider>
    )
}

export default State;