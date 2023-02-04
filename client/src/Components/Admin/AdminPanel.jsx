import React,{useState} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useProSidebar } from 'react-pro-sidebar';
import AdminForm from './AdminForm';
import PopularTracksTable from './Tracks/PopularTracksTable';

const AdminPanel = (props) => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
const [category_m, setcategory_m] = useState("all");

    const onclick = (e) => {
        let txt=e.target.innerText.toLowerCase().split(' ')[0];
        setcategory_m(txt);
    }
    return (
        <>
            <div className="adminPanel">
                {/* {localStorage.getItem('admin_token')?(<div className="adminPanel1"> */}
                    <div className="admin_sidebar" style={{ display: 'flex', height: '100%' }}>
                        <Sidebar>
                            <p className="app_name" style={{ textAlign: 'center', padding: '1.5rem 0' }}>MusiBeat</p>
                            <Menu>
                                <SubMenu label="Tracks">
                                    <MenuItem onClick={onclick}>Popular Tracks</MenuItem>
                                    <MenuItem onClick={onclick}>Dance Tracks</MenuItem>
                                    <MenuItem onClick={onclick}>Chill Tracks</MenuItem>
                                    <MenuItem onClick={onclick}>Sad Tracks</MenuItem>
                                    <MenuItem onClick={onclick}>Workout Tracks</MenuItem>
                                    <MenuItem onClick={onclick}>Recommended Tracks</MenuItem>
                                </SubMenu>
                                <MenuItem> Users </MenuItem>
                            </Menu>
                        </Sidebar>
                    </div>
                    <PopularTracksTable cat={category_m}/>
                {/* </div>):<AdminForm/>} */}
            </div>
        </>
    )
}

export default AdminPanel