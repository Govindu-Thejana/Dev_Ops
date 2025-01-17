import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MNavbar from '../components/MNavbar';

const decodeBase64 = (base64String) => {
  try {
    const base64Data = base64String.startsWith('data:image/')
      ? base64String.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '')
      : base64String;

    const binaryString = window.atob(base64Data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);

    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to decode base64 string:', error);
    return '';
  }
};

const EditVegies = () => {
  const [foodname, setFoodname] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState('');
  const [total, setTotal] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const calculateTotal = () => {
      const priceValue = parseFloat(price) || 0;
      const discountValue = parseFloat(discount) || 0;
      const discountedPrice = priceValue - (priceValue * discountValue) / 100;
      setTotal(discountedPrice.toFixed(2));
    };

    calculateTotal();
  }, [price, discount]);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/vegies/${id}`)
      .then((response) => {
        const { foodname, quantity, price, discount, image } = response.data;
        setFoodname(foodname);
        setQuantity(quantity);
        setPrice(price);
        setDiscount(discount);
        setCurrentImage(image);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  }, [id]);

  const handleEditVegi = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let base64Image = currentImage;
      if (image && image instanceof File) {
        base64Image = await convertToBase64(image);
      }

      const data = {
        foodname,
        quantity,
        price,
        image: base64Image,
        discount,
        total,
      };

      console.log('Submitting data:', data); // Debugging line

      await axios.put(`http://localhost:5555/vegies/${id}`, data);
      navigate('/');
    } catch (error) {
      alert('An error occurred. Please check the console.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <MNavbar />
      <div className='p-4 ml-60'>
        <h1 className='text-3xl my-4 text-center font-semibold'>Edit Fruits</h1>
        {loading && <Spinner />}
        <form
          className='flex flex-wrap border-2 border-black-900 rounded-xl w-full max-w-4xl p-4 mx-auto'
          onSubmit={handleEditVegi}
        >
          <div className='w-full md:w-1/2 p-8 bg-gray-50 '>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500' htmlFor='foodname'>Fruit Name</label>
              <input
                id='foodname'
                type='text'
                value={foodname}
                onChange={(e) => setFoodname(e.target.value)}
                className='bg-gray-200 px-4 py-2 w-full rounded-lg'
                required
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500' htmlFor='quantity'>Weight</label>
              <input
                id='quantity'
                type='text'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='bg-gray-200 px-4 py-2 w-full rounded-lg'
                required
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500' htmlFor='price'>Price</label>
              <input
                id='price'
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='bg-gray-200 px-4 py-2 w-full rounded-lg'
                required
              />
            </div>
          </div>
          <div className='w-full md:w-1/2 p-4 bg-gray-50'>
            <div className='my-4 mt-6 flex flex-col items-center'>
              {currentImage && (
                <img
                  className="mt-2 h-40 object-cover"
                  src={decodeBase64(currentImage)}
                  alt="Current fruit"
                />
              )}
              <label className='text-xl mr-80 pr-5 text-gray-500 mt-4' htmlFor='image'>Image</label>
              <input
                id='image'
                type='file'
                onChange={handleImageChange}
                className='bg-gray-200 px-4 py-2 w-full rounded-lg'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500' htmlFor='discount'>Discount (%)</label>
              <input
                id='discount'
                type='text'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className='bg-gray-200 px-4 py-2 w-full rounded-lg'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500' htmlFor='total'>After Discount</label>
              <input
                id='total'
                type='text'
                value={total}
                readOnly
                className='bg-gray-200 px-4 py-2 w-full rounded-lg'
              />
            </div>
          </div>
          <div className='w-full p-4 flex justify-end'>
            <button
              type='submit'
              className='p-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-2xl shadow-lg hover:from-sky-600 hover:to-blue-600 transition duration-300 transform hover:scale-105'
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVegies;
