const TermsAndConditions = require("../models/TermsAndConditions");

const addCondition = async (req, res) => {
  try {
    const existConditions = await TermsAndConditions.find();

    if (existConditions?.length !== 0) {
      throw new Error( "Terms And Conditions Are Already Exist" );
    }

    var check = await TermsAndConditions.create(req.body);

    res.json({
      Condition: check,
      message: "TermsAndConditions Is Created Successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCondition = async (req, res) => {
  try {
    let Check = await TermsAndConditions.find();
    let ConditionCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: " TermsAndConditions Not Found" });
    }
    res.json({
      totalCondition: ConditionCount,
      Conditions: Check,
      message: "All TermsAndConditions Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConditionsById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await TermsAndConditions.findById(ID);
    let ConditionCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: " TermsAndConditions Not Found" });
    }
    res.json({
      totalInquiry: ConditionCount,
      Conditions: Check,
      message: "TermsAndConditions Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateConditionsById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await TermsAndConditions.findById(ID);
    let ConditionCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: " TermsAndConditions Not Found" });
    }
    Check = await TermsAndConditions.findByIdAndUpdate(Check._id, req.body, {
      new: true,
    });

    res.json({
      totalInquiry: ConditionCount,
      Conditions: Check,
      message: "TermsAndConditions updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeConditionsById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await TermsAndConditions.findById(ID);
    if (!Check) {
      res.status(404).json({ message: " TermsAndConditions Not Found" });
    }
    Check = await TermsAndConditions.findByIdAndDelete(Check._id);

    res.json({ message: "TermsAndConditions Removed" });
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
