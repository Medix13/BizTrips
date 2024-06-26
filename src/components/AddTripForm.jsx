// src/components/AddTripForm.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTrip } from '../services/tripService';

const AddTripForm = ({ onTripAdded }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      startTrip: '',
      endTrip: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      startTrip: Yup.date().required('Start date is required').nullable(),
      endTrip: Yup.date().required('End date is required').nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newTrip = await createTrip(values);
        onTripAdded(newTrip); // Pass the new trip data back to parent component (TripList) to update the list
        resetForm();
        // Optionally: Show success message or navigate back to trip list page
      } catch (error) {
        console.error('Error creating trip:', error);
        // Handle error (e.g., show error message to user)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none ${
            formik.touched.title && formik.errors.title ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-xs italic">{formik.errors.title}</p>
        )}
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
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="4"
          className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none ${
            formik.touched.description && formik.errors.description
              ? 'border-red-500'
              : ''
          }`}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.description}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="startTrip"
          className="block text-gray-700 font-bold mb-2"
        >
          Start Trip
        </label>
        <input
          type="datetime-local" // You can customize this input type as per your date format
          id="startTrip"
          name="startTrip"
          value={formik.values.startTrip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none ${
            formik.touched.startTrip && formik.errors.startTrip
              ? 'border-red-500'
              : ''
          }`}
        />
        {formik.touched.startTrip && formik.errors.startTrip && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.startTrip}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="endTrip" className="block text-gray-700 font-bold mb-2">
          End Trip
        </label>
        <input
          type="datetime-local" // You can customize this input type as per your date format
          id="endTrip"
          name="endTrip"
          value={formik.values.endTrip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none ${
            formik.touched.endTrip && formik.errors.endTrip
              ? 'border-red-500'
              : ''
          }`}
        />
        {formik.touched.endTrip && formik.errors.endTrip && (
          <p className="text-red-500 text-xs italic">{formik.errors.endTrip}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Trip
      </button>
    </form>
  );
};

export default AddTripForm;
