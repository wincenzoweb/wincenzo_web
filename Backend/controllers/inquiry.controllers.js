const Inquiry = require('../models/inquiry');

const addInquiry = async (req, res) => {
    try {
        let { name,email,mobile,subject, description } = req.body;

        let check = await Inquiry.create({
            name,email,mobile,subject, description 
        });

        res.json({ Inquiry: check, message: "inquiry Is Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllInquiry = async (req, res) => {
    try {
        let Check = await Inquiry.find();
        let inquiryCount = Check.length;

        res.json({ totalInquiry: inquiryCount, inquirys: Check, message: "All Inquiry Found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getInquiryById = async (req, res) => {
    try {
        let ID = req.params.id;
        let Check = await Inquiry.findById(ID);
        let inquiryCount = Check.length;

        res.json({ totalInquiry: inquiryCount, inquirys: Check, message: "Inquiry Found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateInquiryById = async (req, res) => {
    try {
        let ID = req.params.id;
        let Check = await Inquiry.findById(ID);
        let inquiryCount = Check.length;

        Check = await Inquiry.findByIdAndUpdate(Check._id, req.body, { new: true });

        res.json({ totalInquiry: inquiryCount, inquirys: Check, message: "Inquiry updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeInquiryById = async (req, res) => {
    try {
        let ID = req.params.id;
        let Check = await Inquiry.findById(ID);

        Check = await Inquiry.findByIdAndDelete(Check._id);

        res.json({ message: "Inquiry Removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addInquiry,
    getAllInquiry,
    getInquiryById,
    updateInquiryById,
    removeInquiryById
}