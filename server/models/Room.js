import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    penginapan: {type: String, ref: "Penginapan", required: true},
    roomType: {type: String, required: true},
    pricePerNight: {type: Number, required: true},
    amenities: {type: Array, required: true},
    images: [{type: String}],
    isAvailable: {type: Boolean, required: true},
   
}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;