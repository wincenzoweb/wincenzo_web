const Settings = require('../models/setting');


const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRazorpaySettings = async (req, res) => {
    try {
      const newSettings = req.body;
      const settings = await Settings.findOneAndUpdate({}, { $set: { razorpay: newSettings } }, { new: true, upsert: true });
      res.status(201).json(settings.razorpay);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const updateRazorpaySettings = async (req, res) => {
    try {
        const updatedSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { razorpay: updatedSettings } }, { new: true, upsert: true });
        res.json(settings.razorpay);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createTwilioSettings = async (req, res) => {
    try {
        const newSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { twilio: newSettings } }, { new: true, upsert: true });
        res.status(201).json(settings.twilio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTwilioSettings = async (req, res) => {
    try {
        const updatedSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { twilio: updatedSettings } }, { new: true, upsert: true });
        res.json(settings.twilio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createGoogleAnalyticsSettings = async (req, res) => {
    try {
        const newSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { googleAnalytics: newSettings } }, { new: true, upsert: true });
        res.status(201).json(settings.googleAnalytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateGoogleAnalyticsSettings = async (req, res) => {
    try {
        const updatedSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { googleAnalytics: updatedSettings } }, { new: true, upsert: true });
        res.json(settings.googleAnalytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createMongoDBSettings = async (req, res) => {
    try {
        const newSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { mongodb: newSettings } }, { new: true, upsert: true });
        res.status(201).json(settings.mongodb);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateMongoDBSettings = async (req, res) => {
    try {
        const updatedSettings = req.body;
        const settings = await Settings.findOneAndUpdate({}, { $set: { mongodb: updatedSettings } }, { new: true, upsert: true });
        res.json(settings.mongodb);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSettings,
    createRazorpaySettings,
    updateRazorpaySettings,
    createTwilioSettings,
    updateTwilioSettings,
    createGoogleAnalyticsSettings,
    updateGoogleAnalyticsSettings,
    createMongoDBSettings,
    updateMongoDBSettings
};