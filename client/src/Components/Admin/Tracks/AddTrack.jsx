import React from 'react'
import Context from '../../../context/songs/Context';
import { useState, useContext } from 'react';

const AddTrack = (props) => {
    const [data1, setdata1] = useState({ songAudio: "", category: "" });
    const onchange1 = (e) => {
        if (e.target.name === 'songAudio') {
            setdata1({ ...data1, [e.target.name]: e.target.files[0] });
        }
        else {
            setdata1({ ...data1, [e.target.name]: e.target.value });
        }
    }

    const context = useContext(Context);
    const onSubmit2 = (e) => {
        e.preventDefault();
        let file = data1.songAudio;
        let category = data1.category;
        context.addSong(file, category);
        setdata1({ songAudio: "",category: "" });
    }

    return (
        <div className="add_song_frm" id="add_song1_frm" style={{'display':'none'}}>
            <form method="POST" className="add_song_frm1" onSubmit={onSubmit2}>
                <div className="add_song_frm1">
                    <input type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" style={{ margin: "1rem 0.4rem" }} name="songAudio" onChange={onchange1} />
                    <div className="category_selector">
                        <label htmlFor="song_category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Category</label>
                        <select name="category" id="category" onChange={onchange1} value={data1.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select</option>
                            <option value="popular">Popular Tracks</option>
                            <option value="dance">Dance Tracks</option>
                            <option value="chill">Chill Tracks</option>
                            <option value="sad">Sad Tracks</option>
                            <option value="workout">Workout Tracks</option>
                            <option value="retro">Retro Tracks</option>
                        </select>
                    </div>
                </div>
                <div className="add_song_submit_btn">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddTrack
