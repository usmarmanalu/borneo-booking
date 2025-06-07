import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user: {type: String, ref: "User", required: true},
    room: {type: String, ref: "Room", required: true},
    penginapan: {type: String, ref: "Penginapan", required: true},
    checkInDate: {type: Date, required: true},
    checkOutDate: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    guest: {type: Number, required: true},
    status: {
        type: String,
        enum: ["pending", "confirmed", "cacelled"],
        default: "pending"
    },
    paymentMethod:{
        type: String,
        required: true,
        default: "Pay At Penginapan"
    },
    isPaid:{
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;