import React, { useState } from 'react';
import axios from 'axios';
import { useAuthInfo } from '@propelauth/react'; // Import useAuthInfo to get the access token

function RequestRole() {
  const [requestedRole, setRequestedRole] = useState('');
  const { accessToken } = useAuthInfo(); // Get the access token from PropelAuth

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/users/request_role',
        {
          requested_role: requestedRole,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error requesting role:', error);
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Request Role Upgrade</h2>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
            Select Role:
          </label>
          <select
            id="role"
            value={requestedRole}
            onChange={(e) => setRequestedRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          onClick={handleRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition w-full"
        >
          Request Role
        </button>
      </div>
    </div>
  );
}

export default RequestRole;