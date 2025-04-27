import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import 'react-toastify/dist/ReactToastify.css';

// import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./Components/Create";
import Footer from "./Footer";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Details from "./Components/Details";
import Edit from "./Components/Edit";
import Swal from 'sweetalert2';
import truckPhoto from './assets/truckPhoto.png'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
  <div className="relative flex flex-col min-h-screen">
    {/* Background image with opacity */}
    <img
      src={{truckPhoto}}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
    />

    {/* Content on top of background */}
    <div className="relative z-10 flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/details/:id" element={<Details />} />
          <Route path="/dashboard/:id/edit" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </div>
</BrowserRouter>

    </>
  );
}

export default App;
