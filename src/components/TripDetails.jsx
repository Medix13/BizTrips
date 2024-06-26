import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTrip, deleteMeeting, addMeeting } from '../services/tripService';
import { TrashIcon } from '@heroicons/react/outline';

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddMeetingForm, setShowAddMeetingForm] = useState(false);
  const [meetingFormData, setMeetingFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const loadTripDetails = async () => {
      try {
        const tripData = await fetchTrip(id);
        setTrip(tripData);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching trip with id ${id}:`, error);
        setLoading(false);
      }
    };

    loadTripDetails();
  }, [id]);

  const handleDeleteMeeting = async (meetingId) => {
    try {
      await deleteMeeting(id, meetingId);
      setTrip((prevTrip) => ({
        ...prevTrip,
        meetings: prevTrip.meetings.filter(
          (meeting) => meeting.id !== meetingId,
        ),
      }));
    } catch (error) {
      console.error(`Error deleting meeting with id ${meetingId}:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMeeting = await addMeeting(id, meetingFormData); // Use addMeeting service function
      setTrip((prevTrip) => ({
        ...prevTrip,
        meetings: [...prevTrip.meetings, newMeeting],
      }));
      setMeetingFormData({
        title: '',
        description: '',
      });
      setShowAddMeetingForm(false); // Close the form after successful submission
    } catch (error) {
      console.error('Error adding meeting:', error);
    }
  };

  const toggleAddMeetingForm = () => {
    setShowAddMeetingForm((prevShow) => !prevShow);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{trip.title}</h2>
      <p className="mb-4">{trip.description}</p>
      <div className="flex mb-4">
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2">Start Trip</h3>
          <p>{formatDate(trip.startTrip)}</p>
        </div>
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2">End Trip</h3>
          <p>{formatDate(trip.endTrip)}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Meetings</h3>
        <ul className="list-disc pl-5">
          {trip.meetings.map((meeting) => (
            <li key={meeting.id} className="flex">
              <p className="text-blue-500 hover:underline">
                {meeting.title}: {meeting.description}
              </p>
              <button
                onClick={() => handleDeleteMeeting(meeting.id)}
                className="ml-2 font-bold py-1 px-2 rounded"
              >
                <TrashIcon className="w-5 h-5 text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {!showAddMeetingForm ? (
          <button
            onClick={toggleAddMeetingForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Meeting
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={meetingFormData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={meetingFormData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Meeting
            </button>
            <button
              type="button"
              onClick={toggleAddMeetingForm}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  const formattedDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
  ).toLocaleString();
  return formattedDate;
};

export default TripDetails;
