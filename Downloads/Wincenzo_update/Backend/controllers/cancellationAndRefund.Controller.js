const cancellationAndRefund = require("../models/cancellationAndRefund");


const addCancellation = async (req, res) => {
    try {
      const existConditions = await cancellationAndRefund.find();
  
      if (existConditions?.length !== 0) {
        throw new Error( "Cancellation And Refund Are Already Exist" );
      }
  
      var check = await cancellationAndRefund.create(req.body);
  
      res.json({
        Condition: check,
        message: "Cancellation And Refund Is Created Successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const getAllCancellation = async (req, res) => {
    try {
      let Check = await cancellationAndRefund.find();
      let ConditionCount = Check.length;
  
      if (!Check) {
        res.status(404).json({ message: " Cancellation And Refund Not Found" });
      }
      res.json({
        totalCondition: ConditionCount,
        Conditions: Check,
        message: "All Cancellation And Refund Found",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getCancellationById = async (req, res) => {
    try {
      let ID = req.params.id;
      let Check = await cancellationAndRefund.findById(ID);
      let ConditionCount = Check.length;
  
      if (!Check) {
        res.status(404).json({ message: " Cancellation And Refund Not Found" });
      }
      res.json({
        totalInquiry: ConditionCount,
        Conditions: Check,
        message: "Cancellation And Refund Found",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateCancellationById = async (req, res) => {
    try {
      let ID = req.params.id;
      let Check = await cancellationAndRefund.findById(ID);
      let ConditionCount = Check.length;
  
      if (!Check) {
        res.status(404).json({ message: "Cancellation And Refund Not Found" });
      }
      Check = await cancellationAndRefund.findByIdAndUpdate(Check._id, req.body, {
        new: true,
      });
  
      res.json({
        totalInquiry: ConditionCount,
        Conditions: Check,
        message: "Cancellation And Refund updated",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const removeCancellationById = async (req, res) => {
    try {
      let ID = req.params.id;
      let Check = await cancellationAndRefund.findById(ID);
      if (!Check) {
        res.status(404).json({ message: "Cancellation And Refund Not Found" });
      }
      Check = await cancellationAndRefund.findByIdAndDelete(Check._id);
  
      res.json({ message: "Cancellation And Refund Removed" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



module.exports = {
    addCancellation,
    getAllCancellation,
    getCancellationById,
    updateCancellationById,
    removeCancellationById,
};
