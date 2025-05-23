import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthInfo } from '@propelauth/react';
import { fetchCourses } from '../../api/api'; // Import the API function

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const { accessToken } = useAuthInfo();
  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses(accessToken); // Use the API function
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
      }
    };

    getCourses();
  }, [accessToken]);

  const handleOptionClick = (courseId, option) => {
    if (option === 'notes') {
      navigate(`/courses/${courseId}/notes`); // Navigate to the notes page for the course
    } else if (option === 'threads') {
      navigate(`/courses/${courseId}/threads`);
    }
  };

  const handleUploadClick = (courseId) => {
    navigate(`/courses/${courseId}/upload-note`);
  };

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!courses.length) {
    return <p className="text-gray-400 text-center mt-4">No courses available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">Courses</h2>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="bg-gray-800 shadow-md rounded-lg p-4 hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-semibold text-gray-200">{course.name}</h3>
            <div className="mt-2 space-x-4">
              <button
                onClick={() => handleOptionClick(course.id, 'notes')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Notes
              </button>
              <button
                onClick={() => handleOptionClick(course.id, 'threads')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Discussion Threads
              </button>
              <button
                onClick={() => handleUploadClick(course.id)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              >
                Upload Notes
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;