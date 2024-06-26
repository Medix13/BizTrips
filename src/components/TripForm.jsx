import React, { useState, useEffect } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { fetchTrips, createTrip } from '../services/tripService';

const TripForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTrips = async () => {
      try {
        await fetchTrips();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setIsLoading(false);
      }
    };

    getTrips();
  }, []);

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
        console.log('Trip created successfully:', newTrip);
        resetForm();
      } catch (error) {
        console.error('Error creating trip:', error);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps('title')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.title}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            id="description"
            type="text"
            {...formik.getFieldProps('description')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTrip"
          >
            Start Trip:
          </label>
          <input
            id="startTrip"
            type="date"
            {...formik.getFieldProps('startTrip')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.startTrip && formik.errors.startTrip ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.startTrip}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTrip"
          >
            End Trip:
          </label>
          <input
            id="endTrip"
            type="date"
            {...formik.getFieldProps('endTrip')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.endTrip && formik.errors.endTrip ? (
            <div className="text-red-500 text-xs italic">
              {formik.errors.endTrip}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <h3 className="block text-gray-700 text-sm font-bold mb-2">
            Meetings
          </h3>
          <FieldArray
            name="meetings"
            render={(arrayHelpers) => (
              <div>
                {formik.values.meetings.map((meeting, index) => (
                  <div key={index} className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-1"
                      htmlFor={`meetings.${index}.title`}
                    >
                      Meeting Title:
                    </label>
                    <input
                      id={`meetings.${index}.title`}
                      type="text"
                      {...formik.getFieldProps(`meetings.${index}.title`)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    {formik.touched.meetings && formik.errors.meetings ? (
                      formik.errors.meetings[index] &&
                      formik.errors.meetings[index].title ? (
                        <div className="text-red-500 text-xs italic">
                          {formik.errors.meetings[index].title}
                        </div>
                      ) : null
                    ) : null}

                    <label
                      className="block text-gray-700 text-sm font-bold mb-1"
                      htmlFor={`meetings.${index}.description`}
                    >
                      Meeting Description:
                    </label>
                    <input
                      id={`meetings.${index}.description`}
                      type="text"
                      {...formik.getFieldProps(`meetings.${index}.description`)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.meetings && formik.errors.meetings ? (
                      formik.errors.meetings[index] &&
                      formik.errors.meetings[index].description ? (
                        <div className="text-red-500 text-xs italic">
                          {formik.errors.meetings[index].description}
                        </div>
                      ) : null
                    ) : null}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({ title: '', description: '' })
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Meeting
                </button>
              </div>
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </FormikProvider>
  );
};

export default TripForm;
