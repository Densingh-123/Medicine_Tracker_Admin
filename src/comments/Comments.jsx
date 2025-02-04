import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Cooments.css';
import SideBar from '../sidebar/SideBar';
import { FaRegClock, FaEnvelope, FaCommentDots, FaCalendarAlt, FaUser } from 'react-icons/fa';

const UserData = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'medications'));
        const medsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedications(medsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medications:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString();
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return timeString;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-data-page" >
      <SideBar />
      <h2>Comments</h2>
      <div className="medication-container">
        {medications.length === 0 ? (
          <p>No medications found</p>
        ) : (
          medications.map(med => (
            <div key={med.id} className="medication-card">
              <div className="medication-header">
                <img src={med.type?.icon || 'https://via.placeholder.com/50'} alt="Medication Icon" className="medication-icon" />
                <h3>{med.name}</h3>
              </div>
              <div className="medication-details">
                <p><FaEnvelope className="icon" /><strong> User Email:</strong> {med.userEmail}</p>
                <p><FaCommentDots className="icon" /><strong> Comment:</strong> {med.comments?.[0] || 'No comments'}</p>
                <p><FaCalendarAlt className="icon" /><strong> Date:</strong> {formatDate(med.dates?.[0])}</p>
                <p><FaRegClock className="icon" /><strong> Time:</strong> {formatTime(med.action?.[0]?.time)}</p>
                <p><FaUser className="icon" /><strong> Status:</strong> {med.action?.[0]?.status || 'N/A'}</p>
              </div>
              <div className="medication-footer">
                <span>{med.when}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserData;