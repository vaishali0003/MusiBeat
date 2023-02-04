import React, { useContext, useState, useEffect, useMemo } from 'react'
import DataTable from 'react-data-table-component'
import AddTrack from './AddTrack'
import Context from '../../../context/songs/Context'

const PopularTracksTable = (props) => {
   const [tabledata, settabledata] = useState([]);
   const [search, setsearch] = useState("");
   const [esong, setesong] = useState({ id: "", etitle: "", eartist: "", ecategory: "" })
   const context = useContext(Context)
   const {cat}=props;

   const editNote = (currentsong) => {
      document.getElementById('authentication-modal').classList.toggle('hidden')
      setesong({ id: currentsong._id, etitle: currentsong.title, eartist: currentsong.artist, ecategory: currentsong.category })
   }

   const onchange = (e) => {
      setesong({ ...esong, [e.target.name]: e.target.value });
   }

   const handlesubmit = (e) => {
      e.preventDefault();
      context.editNote(esong.id, esong.etitle, esong.eartist, esong.ecategory)
      setesong({ id: "", etitle: "", eartist: "", ecategory: "" })
   }

   const deleteNote = (id) => {
      context.deleteNote(id)
   }

   const closeModalClick = () => {
      document.getElementById('authentication-modal').classList.toggle('hidden')
   }

   const gettabledata = async () => {
      let data = await context.getallsongs(cat,search);
      settabledata(data);
   }

   const onchange12=(e)=>{
      setsearch(e.target.value);
    }
 
   useEffect(() => {
      gettabledata();
   }, [cat,search,context.flag]);


   const columns = useMemo(() => [
      {
         name: 'Title',
         selector: row => row.title,
         sortable: true,
      },
      {
         name: 'Artist',
         selector: row => row.artist,
         sortable: true,
      },
      {
         name: 'Category',
         selector: row => row.category,
         sortable: true,
      },
      {
         cell: (row) => <div style={{ 'minWidth': '20rem' }}><button type="button" onClick={() => { editNote(row) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
            <button type="button" onClick={() => { deleteNote(row._id) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>
         </div>
      },
   ], []);

   const toggleFunc = () => {
      var divItem = document.getElementById('add_song1_frm');
      if (divItem !== null) {
         if (divItem.style.display === 'none') {
            divItem.style.display = 'block';
         }
         else {
            divItem.style.display = 'none';
         }
      }
   }

   return (
      <>
         <div className="data_table">
            <div className="modalpart">

               <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                  <div className="relative w-full h-full max-w-md md:h-auto" style={{ 'margin': 'auto' }}>
                     <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" onClick={closeModalClick} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                           <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                           <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                           <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Song</h3>
                           <form className="space-y-6" onSubmit={handlesubmit}>
                              <div>
                                 <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                 <input type="text" name="etitle" id="modal_tit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={esong.etitle} onChange={onchange} required />
                              </div>
                              <div>
                                 <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artist</label>
                                 <input type="text" name="eartist" id="modal_pass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={esong.eartist} onChange={onchange} required />
                              </div>
                              <div>
                                 <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                 <input type="text" name="ecategory" id="modal_cat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={esong.ecategory} onChange={onchange} required />
                              </div>
                              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ 'marginTop': '1rem' }}>Save</button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
               <button onClick={toggleFunc} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mx-1 ml-2">Add</button>
            <AddTrack />
            <DataTable columns={columns} data={tabledata} pagination 
            subHeader
            subHeaderComponent={
               <input
               type="text"
               placeholder="Search here"
               onChange={onchange12}
               value={search}
               />
            }
            />
         </div>

      </>
   )
}

export default PopularTracksTable;
