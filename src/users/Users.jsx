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
        // Fetch data from 'medications' collection
        const medicationSnapshot = await getDocs(collection(db, 'medications'));
        const medicationsData = medicationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch data from 'users' collection
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Merge data based on userEmail
        const mergedUsers = [];

        // Add users from medications with corresponding user info
        medicationsData.forEach(med => {
          const user = usersData.find(u => u.email === med.userEmail);
          mergedUsers.push({
            id: med.id,
            userEmail: med.userEmail,
            userName: user && user.name ? user.name : med.userEmail.split('@')[0],
          });
        });

        // Add users from 'users' collection if not already in mergedUsers
        usersData.forEach(user => {
          if (!mergedUsers.some(m => m.userEmail === user.email)) {
            mergedUsers.push({
              id: user.id,
              userEmail: user.email,
              userName: user.name ? user.name : user.email.split('@')[0],
            });
          }
        });

        setUsers(mergedUsers);
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
                  <div className="user-name">{user.userName}</div>
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
