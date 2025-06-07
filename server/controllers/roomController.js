import Penginapan from "../models/Penginapan.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";

//  API to create a new room for a penginapan
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const penginapan = await Penginapan.findOne({owner: req.auth.userId});

        if(!penginapan) return res.json({succcess: false, message: "No Penginapan Found"});

        // upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const respones = await cloudinary.uploader.upload(file.path);
            return respones.secure_url;
        });
        // wait for all uploads to complete
        const images = await Promise.all(uploadImages);

        await Room.create({
            penginapan: penginapan._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({succcess: true, message: "Room created succesfully"})
    } catch (error) {
        res.json({succcess: false, message: error.message})
    }
}

// API to get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: 'penginapan',
            populate:{
                path: 'owner',
                select: 'image'            
            }
        }).sort({createdAt: -1})
        res.json({success: true, rooms})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

// API to get all rooms for a spesific penginapan
export const getOwnerRooms = async (req, res) => {
    try {
        const penginapanData = await Penginapan({owner: req.auth.userId})
        const rooms = await Room.find({penginapan: penginapanData._id.toString()}).populate("penginapan");
        res.json({success: true, rooms});
    } catch (error) {
        res.json({succcess: false, message: error.message});
    }
}

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = rq.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Room availability Updated"});
    } catch (error) {
        res.json({succcess: false, message: error.message});
    }
}