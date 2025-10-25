import './App.css'
import {ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {

  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
        
    </>
  )
}

export default App
