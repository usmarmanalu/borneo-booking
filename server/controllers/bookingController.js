import Booking from "../models/Booking.js"
import Penginapan from "../models/Penginapan.js";
import Room from "../models/Room.js";

// function to check availability of room
const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
     console.error(error.message);      
    }
}

// API to check availability of room
// POST /api/bookins/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {room, checkInDate, checkOutDate} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success: true, isAvailable});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// API to create a new booking
// POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guest } = req.body;
        const user = req.user._id;

        // before booking check availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if(!isAvailable){
            return res.json({success: false, message: "Room is not available"})
        }

        // get total price from room
        const roomData = await Room.findById(room).populate("penginapan");
        let totalPrice = roomData.pricePerNight;

        // calculate totalprice based on nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights
        const booking = await Booking.create({
            user,
            room,
            penginapan: roomData.penginapan._id,
            guest: +guest,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        res.json({success: true, message: "Booking created succesfully"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to create booking"});
    }
}

// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id
        const bookings = await Booking.find({user}).populate("room penginapan").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        res.json({success: false, message: "Failed to fetch bookings"})
    }
}


export const getPenginapanBookings = async (req, res) => {
    try {
        const penginapan = await Penginapan.findOne({owner: req.auth.userId});
    if(!penginapan) {
        return res.json({success: false, message: "No Penginapan found"});
    }
    const bookings = await Booking.find({penginapan: penginapan._id}).populate("room penginapan user").sort({createdAt: -1});

    // Total bookings
    const totalBookings = bookings.length;

    // total revenue
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

    res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}})
    } catch (error) {
    res.json({success: false, message: "Failed to fetch bookings"})
    }
}