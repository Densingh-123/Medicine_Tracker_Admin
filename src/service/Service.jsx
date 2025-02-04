import React from 'react';
import Sidebar from '../sidebar/SIdeBar';

const Service = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <img
        src="https://www.shutterstock.com/image-vector/hours-taking-medicine-doctor-on-600nw-2524005293.jpg"
        alt="Service"
        style={{
          width: 13000,
          height: 1090,
          objectFit: 'cover',
          marginLeft: '-50px', // Adjust based on sidebar width
        }}
      />
    </div>
  );
};

export default Service;
