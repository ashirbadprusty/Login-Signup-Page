import React from 'react';

const Dashboard = () => {
  return (
    <div className='bg-gradient-to-br from-blue-800 to-blue-500 h-screen flex items-center justify-center p-6'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'>
        <h1 className='text-5xl font-bold text-gray-900 mb-4 text-center'>Dashboard</h1>
        <h2 className='text-2xl font-semibold text-gray-700 text-center'>Under Processing...</h2>
        <p className='text-center text-gray-500 mt-4'>
          We are working hard to bring new features to your dashboard. Please check back later.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
