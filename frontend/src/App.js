import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import 'antd/dist/antd.css';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
