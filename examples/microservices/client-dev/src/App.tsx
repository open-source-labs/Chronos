import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Protected from './pages/Protected.js';
import SharedLayout from './pages/SharedLayout.js';
import NotFound from './pages/NotFound.js';
import About from './pages/About.js';
import Items from './pages/Items.js';
import Orders from './pages/Orders.js';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <SharedLayout />
          </Protected>
        }
      >
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
