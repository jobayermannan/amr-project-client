import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaUtensils, FaTimes, FaChevronUp } from "react-icons/fa";
import useAxiosSecure from '../../../hook/useAxiosSecure';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Recipe Name is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  recipe: Yup.string().required('Recipe is required'),
  image: Yup.mixed().required('Image is required')
});

const AddItems = () => {
  const axiosSecure = useAxiosSecure();

  const initialValues = {
    name: '',
    category: '',
    price: '',
    recipe: '',
    image: null,
    isSubmitting: false,
    error: null
  };

  const handleSubmit = async (values, { setFieldValue, setSubmitting, resetForm }) => {
    setFieldValue('isSubmitting', true);
    setFieldValue('error', null);

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(values.image);

      // Prepare menu item data
      const menuItem = {
        name: values.name,
        category: values.category,
        price: parseFloat(values.price),
        recipe: values.recipe,
        image: imageUrl
      };

      // Send data to MongoDB through server
      const response = await axiosSecure.post('/menu', menuItem);

      if (response.data._id) {  // Changed from response.data.insertedId
        console.log('Menu item added successfully');
        resetForm();
        
        // Optionally, display the uploaded image
        alert(`Menu item added successfully! Image URL: ${imageUrl}`);
      } else {
        throw new Error('Failed to add menu item');
      }
    } catch (err) {
      console.error('Error adding menu item:', err);
      setFieldValue('error', err.message || 'An error occurred while adding the menu item');
    } finally {
      setFieldValue('isSubmitting', false);
      setSubmitting(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'sample/food'); // Optional: specify folder in Cloudinary

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      
      const response = await axios.post(
        uploadUrl,
        formData
      );

      if (response.data && response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error('Failed to get image URL from Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
  };

  const handleRemoveFile = (setFieldValue) => {
    setFieldValue("image", null);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      <SectionTitle subHeading="What's new?" heading="Add an Item" />
      <div className="max-w-4xl mx-auto mt-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
              {/* Recipe Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Recipe name*</label>
                <Field 
                  name="name" 
                  type="text" 
                  placeholder="Recipe name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" 
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Category and Price */}
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                {/* Category */}
                <div className="flex-1">
                  <label htmlFor="category" className="block mb-2 font-semibold text-gray-700">Category*</label>
                  <div className="relative">
                    <Field 
                      as="select" 
                      name="category" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                    >
                      <option value="">Select a category</option>
                      <option value="salad">Salad</option>
                      <option value="soup">Soup</option>
                      <option value="pizza">Pizza</option>
                      <option value="dessert">Dessert</option>
                      <option value="drinks">Drinks</option>
                    </Field>
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                      <FaChevronUp className="text-gray-400" />
                    </div>
                  </div>
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Price */}
                <div className="flex-1">
                  <label htmlFor="price" className="block mb-2 font-semibold text-gray-700">Price*</label>
                  <Field 
                    name="price" 
                    type="number" 
                    placeholder="Price" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" 
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Recipe Description */}
              <div className="mb-6">
                <label htmlFor="recipe" className="block mb-2 font-semibold text-gray-700">Recipe*</label>
                <Field 
                  as="textarea" 
                  name="recipe" 
                  placeholder="Recipe" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-28 resize-none bg-white" 
                />
                <ErrorMessage name="recipe" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label htmlFor="image" className="block mb-2 font-semibold text-gray-700">Image*</label>
                <div className="flex items-center">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                    className="hidden"
                    accept="image/*"
                    key={values.image ? "file-selected" : "no-file"}
                  />
                  <label
                    htmlFor="image"
                    className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors select-none"
                  >
                    <span className="pointer-events-none">
                      {values.image ? values.image.name : "Choose File"}
                    </span>
                  </label>
                  {values.image && (
                    <button 
                      type="button"
                      onClick={() => handleRemoveFile(setFieldValue)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Display Error Message */}
              {values.error && (
                <div className="mb-4 text-red-500">{values.error}</div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-lg font-bold w-full md:w-auto hover:bg-amber-700 transition-colors"
                disabled={values.isSubmitting}
              >
                {values.isSubmitting ? 'Adding Item...' : 'Add Item'}
                {!values.isSubmitting && <FaUtensils className='ml-2' />}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddItems;