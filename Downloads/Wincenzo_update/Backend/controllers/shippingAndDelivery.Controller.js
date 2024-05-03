const ShippingAndDelivery = require("../models/shippingAndDelivery");

const addCondition = async (req, res) => {
  try {
    const existConditions = await ShippingAndDelivery.find();

    if (existConditions?.length !== 0) {
      throw new Error( "Shipping And Delivery Are Already Exist" );
    }

    var check = await ShippingAndDelivery.create(req.body);

    res.json({
      Condition: check,
      message: "Shipping And Delivery Is Created Successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCondition = async (req, res) => {
  try {
    let Check = await ShippingAndDelivery.find();
    let ConditionCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: " Shipping And Delivery Not Found" });
    }
    res.json({
      totalCondition: ConditionCount,
      Conditions: Check,
      message: "All Shipping And Delivery Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConditionsById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await ShippingAndDelivery.findById(ID);
    let ConditionCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: " ShippingAndDelivery Not Found" });
    }
    res.json({
      totalInquiry: ConditionCount,
      Conditions: Check,
      message: "ShippingAndDelivery Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateConditionsById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await ShippingAndDelivery.findById(ID);
    let ConditionCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: " ShippingAndDelivery Not Found" });
    }
    Check = await ShippingAndDelivery.findByIdAndUpdate(Check._id, req.body, {
      new: true,
    });

    res.json({
      totalInquiry: ConditionCount,
      Conditions: Check,
      message: "ShippingAndDelivery updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeConditionsById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await ShippingAndDelivery.findById(ID);
    if (!Check) {
      res.status(404).json({ message: " ShippingAndDelivery Not Found" });
    }
    Check = await ShippingAndDelivery.findByIdAndDelete(Check._id);

    res.json({ message: "ShippingAndDelivery Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCondition,
  getAllCondition,
  getConditionsById,
  updateConditionsById,
  removeConditionsById,
};
