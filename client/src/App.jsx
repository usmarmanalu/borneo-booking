import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms.JSX";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import PenginapanReg from "./components/PenginapanReg";
import Layout from "./pages/penginapanOwner/Layout";
import Dashboard from "./pages/penginapanOwner/Dashboard";
import AddRoom from "./pages/penginapanOwner/AddRoom";
import ListRoom from "./pages/penginapanOwner/ListRoom";

const App = () => {
  
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <PenginapanReg />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/rooms" element={<AllRooms/>} />
          <Route path="/rooms/:id" element={<RoomDetails/>} />
          <Route path="/my-bookings" element={<MyBookings/>} />

          <Route path="/owner" element={<Layout/>}>
              <Route index element={<Dashboard/>} />
              <Route path="add-room" element={<AddRoom/>} />
              <Route path="list-room" element={<ListRoom/>} />

          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
