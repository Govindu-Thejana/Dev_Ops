import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../components/Footer'; // Assuming Footer component exists

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

const Home = () => {
  const [vegies, setVegies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/vegies') // Update with the correct backend API endpoint
      .then((response) => {
        setVegies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <header className="bg-green-500 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Fruit Store!</h1>
          <p className="mt-2 text-lg">Fresh and organic fruits delivered to your doorstep</p>
        </div>
      </header>
      <main className="container mx-auto mt-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {vegies.map((vegi) => {
            const imageUrl = decodeBase64(vegi.image);

            return (
              <motion.div
                key={vegi._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={`/products/${vegi._id}`}>
                  <img
                    className="h-48 w-full object-cover"
                    src={imageUrl || '/path-to-placeholder-image'}
                    alt={vegi.foodname}
                  />
                </a>
                <div className="p-4">
                  <a href={`/products/${vegi._id}`}>
                    <h2 className="text-lg font-bold hover:underline">{vegi.foodname}</h2>
                  </a>
                  <p className="mt-2 text-gray-600">
                    <span>{vegi.quantity}g</span>
                  </p>
                  <p className="mt-2 text-blue-700 font-semibold">
                    Rs. {vegi.discount ? (
                      <>
                        <span className="line-through">{vegi.price}</span> <span>{vegi.total}</span>
                      </>
                    ) : (
                      vegi.price
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-10 text-center">
          <a
            href="/vegies"
            className="py-3 px-6 text-lg text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            View More Products
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;