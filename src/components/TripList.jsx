import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrips } from '../services/tripService';
import AddTripForm from './AddTripForm';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadTripsData = async () => {
      try {
        const tripsData = await fetchTrips();
        setTrips(tripsData);
        setFilteredTrips(tripsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setLoading(false);
      }
    };

    loadTripsData();
  }, []);

  useEffect(() => {
    const filterTripsByMonth = () => {
      if (filterMonth === '') {
        setFilteredTrips(trips);
      } else {
        const filtered = trips.filter((trip) => {
          const startMonth = trip.startTrip[1]; // Assuming startTrip is an array [year, month, day, hour, minute]
          return startMonth.toString() === filterMonth;
        });
        setFilteredTrips(filtered);
      }
    };

    filterTripsByMonth();
  }, [filterMonth, trips]);

  const handleFilterChange = (e) => {
    setFilterMonth(e.target.value);
  };

  const handleTripAdded = (newTrip) => {
    setTrips([...trips, newTrip]); // Update trips list with the new trip
    setShowForm(false); // Hide the form after adding the trip
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6">
      <FilterSection
        onFilterChange={handleFilterChange}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <h2 className="text-2xl font-bold mb-4">Trips</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.length === 0 ? (
          <NoTripsMessage />
        ) : (
          filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        )}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="container mx-auto p-6">Loading...</div>
);

const FilterSection = ({ onFilterChange, showForm, setShowForm }) => (
  <>
    <section className="filter-section bg-gray-100 p-4 mb-4 flex justify-between items-center rounded-lg shadow-md">
      <div className="flex items-center">
        <label htmlFor="month" className="mr-2 font-semibold">
          Filter by Month:
        </label>
        <select
          id="month"
          className="month-select p-2 border rounded"
          onChange={onFilterChange}
        >
          <option value="">All months</option>
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={(index + 1).toString()}>
              {new Date(0, index).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {showForm ? 'Close Form' : 'Add New Trip'}
      </button>
    </section>
    {showForm && <AddTripForm />}
  </>
);

const TripCard = ({ trip }) => (
  <div className="border rounded-lg overflow-hidden">
    <Link to={`/trip/${trip.id}`} className="block relative">
      <img
        src="/images/images.png"
        alt={trip.title}
        className="object-cover w-full h-48"
      />
    </Link>
    <div className="p-4">
      <Link
        to={`/trip/${trip.id}`}
        className="text-xl font-bold text-blue-500 hover:underline mb-2 block"
      >
        {trip.title}
      </Link>
      <p className="text-gray-600 mb-2">{trip.description}</p>
      <div className="text-gray-600">
        <p>
          <span className="font-semibold">Start Trip:</span>{' '}
          {formatDate(trip.startTrip)}
        </p>
        <p>
          <span className="font-semibold">End Trip:</span>{' '}
          {formatDate(trip.endTrip)}
        </p>
      </div>
    </div>
  </div>
);

const NoTripsMessage = () => (
  <div className="text-center text-gray-600">
    No trips found for selected filter.
  </div>
);

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

export default TripList;
