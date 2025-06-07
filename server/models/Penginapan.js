import mongoose from "mongoose";

const penginapanSchema = mongoose.Schema({
    name:{type: String, required: true},
    address:{type: String, required: true},
    contact:{type: String, required: true},
    owner:{type: String, required: true, ref: "User"},
    city:{type: String, required: true},
}, {timestamps: true});

const Penginapan = mongoose.model("Penginapan", penginapanSchema);

export default Penginapan;