import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // create a Svix insatance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting header
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const payloadString = req.body.toString("utf8");
        const payload = JSON.parse(payloadString);

        // Verifying Headers
        // await whook.verify(JSON.stringify(req.body), headers)
        await whook.verify(req.body, headers);

        // getting data from request bosy
        // const {data, type} = req.body
        const {data, type} = payload;

        const userData = {
            _id: data.id,
            // email: data.email_addresses[0].email_address,
             email: data.email_addresses[0]?.email_address || "",
            // username: data.first_name + " " + data.last_name,
             username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            // image: data.image_url,
             image: data.image_url || "",
             recentSearchedCities: [],
        }

        // switch cases for different events
        switch (type) {
            case "user.created": {  
                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id ,userData);
                break;
            }

             case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }
        
            default:
                break;
        }
        res.json({success: true, message: "Webhook Recieved"})


    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

export default clerkWebhooks;