import Penginapan from "../models/Penginapan.js";
import User from "../models/User.js";

export const registerPenginapan = async (req, res) => {
    try {
        const {name, address, contact, city} = req.body;
        const owner = req.user._id

        // check if user already registered
        const penginapan = await Penginapan.findOne({owner})
        if (penginapan) {
            return res.json({success: false, message: "Penginapan Already Registered"})   
        }

        await Penginapan.create({name, address, contact, city, owner});

        await User.findByIdAndUpdate(owner, {role: "penginapanOwner"});

        res.json({success: true, message: "Penginapan Already Succesfully"})   
    
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }
}