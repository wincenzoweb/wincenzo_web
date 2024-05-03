const Message = require("../models/message");

const addMessage = async (req, res) => {
    try {
        const { email, message } = req.body;
        const newMessage = await Message.create({ email, message });
        
        res.status(201).json({ message: "Message sent successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllMessage = async (req, res) => {
    try {
        let messages = await Message.find();
        let messagesCount = messages.length;

        res.json({ messagesCount: messagesCount, messages: messages, message: "All subscriber Found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeMessageById = async (req, res) => {
    try {
        let messageId = req.params.id;
        let deletemessage = await Message.findById(messageId);

        deletemessage = await Message.findByIdAndDelete(deletemessage._id);

        res.json({ message: "message Removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

module.exports = {
    addMessage,
    removeMessageById,
    getAllMessage
}
