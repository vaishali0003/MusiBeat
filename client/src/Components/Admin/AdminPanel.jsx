import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useProSidebar } from 'react-pro-sidebar';
import AdminForm from './AdminForm';
import PopularTracksTable from './Tracks/PopularTracksTable';

const AdminPanel = () => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    return (
        <>
            <div className="adminPanel">
                <div className="adminPanel1">
                    <div className="admin_sidebar" style={{ display: 'flex', height: '100%' }}>
                        <Sidebar>
                            <p className="app_name" style={{textAlign: 'center',padding: '1.5rem 0'}}>TuneUp</p>
                            <Menu>
                                <SubMenu label="Tracks">
                                    <MenuItem>Popular Tracks</MenuItem>
                                    <MenuItem>Dance Tracks</MenuItem>
                                    <MenuItem>Chill Tracks</MenuItem>
                                    <MenuItem>Sad Tracks</MenuItem>
                                    <MenuItem>Workout Tracks</MenuItem>
                                    <MenuItem>Recommended Tracks</MenuItem>
                                </SubMenu>
                                {/* <MenuItem> Tracks </MenuItem> */}
                                <MenuItem> Users </MenuItem>
                            </Menu>
                            {/* <main>
             <button onClick={() => collapseSidebar()}>Collapse</button>
          </main> */}
                        </Sidebar>
                    </div>
                    {/* <AdminForm/> */}
                    <PopularTracksTable/>
                </div>
            </div>
        </>
    )
}

export default AdminPanel