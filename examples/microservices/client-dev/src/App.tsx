import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Protected from './pages/Protected';
import SharedLayout from './pages/SharedLayout';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Items from './pages/Items';
import Orders from './pages/Orders';

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
