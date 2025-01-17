import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateVegies from './pages/CreateVegies'
import ShowVegies from './pages/ShowVegies'
import EditVegies from './pages/EditVegies'
import DeleteVegies from './pages/DeleteVegies'
import ManagerLogin from './pages/ManagerLogin'
import Overview from './pages/Overview'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/vegies/create' element={<CreateVegies />} />
      <Route path='/vegies/details/:id' element={<ShowVegies />} />
      <Route path='/products/:id' element={<ShowVegies />} />
      <Route path='/vegies/edit/:id' element={<EditVegies />} />
      <Route path='/vegies/delete/:id' element={<DeleteVegies />} />

      <Route path='/manager/login' element={<ManagerLogin />} />
      <Route path='/manager/overview' element={<Overview />} />
    </Routes>

  );
}

export default App