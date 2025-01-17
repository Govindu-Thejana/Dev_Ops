import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const Eemail = 'manager@gmail.com';
    const Ppassword = '123';

    if (email === Eemail && password === Ppassword) {
      navigate('/vegies/create');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <div><h1 className='text-center text-5xl font-semibold'>Manager Login</h1></div>
      <section className="relative py-20 xl:py-10 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -mx-4 items-center">
              <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="max-w-md mx-auto lg:mx-0">
                  <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
                    Sign in to your account
                  </h3>
                  <p className="text-lg text-gray-500 mb-10">
                    Greetings on your return! We kindly request you to enter your details.
                  </p>
                  <form onSubmit={handleLogin}>
                    <div className="mb-6">
                      <label
                        className="block mb-1.5 text-sm text-gray-900 font-semibold"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-none rounded-lg"
                        type="email"
                        id="email"
                        placeholder="pat@saturn.dev"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-7">
                      <div className="flex mb-1.5 items-center justify-between">
                        <label
                          className="block text-sm text-gray-900 font-semibold"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-none rounded-lg"
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100"
                        >
                          <img
                            src="/eye.png"
                            alt="Toggle password visibility"
                          />
                        </button>
                      </div>
                    </div>
                    <button
                      className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-600 rounded-full overflow-hidden"
                      type="submit"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <span className="relative">Login</span>
                    </button>
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4">
                <div className="relative max-w-md lg:max-w-2xl mx-auto lg:mr-0">
                  <img
                    className="block h-full w-full"
                    src="/mlogin.jpg"
                    alt="Funny image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagerLogin;
