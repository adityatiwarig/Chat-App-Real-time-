import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import './App.css';
import Signup from './components/Signup.jsx';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <h1>Page Not Found</h1>,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  
  return (
    <>
    <div className='p-4 h-screen flex  items-center justify-center'>
      <RouterProvider router={router}/>

    </div>
      
    </>
  )
}

export default App
