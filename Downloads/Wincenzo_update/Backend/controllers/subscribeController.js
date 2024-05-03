const Subscriber = require("../models/subscribe")

const addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        const newSubscriber = await Subscriber.create({ email });
        
        res.status(201).json({ message: "Subscribed successfully", subscriber: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeSubscriberById = async (req, res) => {
    try {
        const subscriberId = req.params.id;

        // Find the subscriber by ID
        const subscriber = await Subscriber.findById(subscriberId);

        // Check if the subscriber exists
        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }
        // Remove the subscriber
        await Subscriber.findByIdAndDelete(subscriberId);
        // Send a success response
        res.json({ message: "Subscriber removed successfully" });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
}

const getSubscriber = async (req, res) => {
    try {
        let subscriber = await Subscriber.find();
        let subscriberCount = subscriber.length;

        res.json({ subscriberCount: subscriberCount, subscriber: subscriber, message: "All subscriber Found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    addSubscriber,
    removeSubscriberById,
    getSubscriber
    
}