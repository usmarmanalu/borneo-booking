import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import PenginapanReg from "./components/PenginapanReg";
import Dashboard from "./pages/penginapanOwner/Dashboard";
import AddRoom from "./pages/penginapanOwner/AddRoom";
import ListRoom from "./pages/penginapanOwner/ListRoom";
import{Toaster} from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Layout from "./pages/penginapanOwner/Layout";

const App = () => {
  
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showPenginapanReg} = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showPenginapanReg && <PenginapanReg />}

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
