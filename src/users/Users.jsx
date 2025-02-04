import React, { useEffect, useState } from 'react';
import SlideBar from '../sidebar/SideBar';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaUsers, FaBars } from 'react-icons/fa';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'medications'));
        const usersList = [];
        querySnapshot.forEach(doc => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      timeZoneName: 'short' 
    });
  };

  return (
    <div className="users-page" onClick={handleCloseSidebar}>
      <button className="hamburger" onClick={handleToggleSidebar}>
        <FaBars />
      </button>
      <SlideBar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="users-container">
        <h2>
          <FaUsers className="header-icon" /> Users List
        </h2>
        <div className="users-table">
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map(user => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <div className="user-name">{user.userEmail.split('@')[0]}</div>
                </div>
                <div className="user-info">
                  <FaEnvelope className="user-icon" />
                  <div className="user-email">{user.userEmail}</div>
                </div>
              
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
