import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import { FaTachometerAlt, FaUsers, FaDatabase, FaSignOutAlt, FaComments } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/home')}><FaTachometerAlt className="icon" /> Dashboard</li>
        <li onClick={() => navigate('/users')}><FaUsers className="icon" /> Users</li>
        <li onClick={() => navigate('/data')}><FaDatabase className="icon" /> Users Data</li>
        <li onClick={() => navigate('/comment')}><FaComments className="icon" /> Comments</li>
        <li className="logout" onClick={() => navigate('/')}><FaSignOutAlt className="icon" /> Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
