const privacyPolicy = require("../models/privacyPolicy");

const addPolicy = async (req, res) => {
  try {
        const existConditions = await privacyPolicy.find();

        if (existConditions?.length !== 0) {
          throw new Error("Privacy Policy Are Already Exist");
        }

    let check = await privacyPolicy.create(req.body);

    res.json({
      Policy: check,
      message: "privacyPolicy Is Created Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPolicy = async (req, res) => {
  try {
    let Check = await privacyPolicy.find();
    let PolicyCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: "Policy Not Found" });
    }
    res.json({
      totalPolicy: PolicyCount,
      Policys: Check,
      message: "All privacyPolicy Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPolicyById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await privacyPolicy.findById(ID);
    let PolicyCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: "Policy Not Found" });
    }
    res.json({
      totalPolicy: PolicyCount,
      Policys: Check,
      message: "privacyPolicy Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePolicyById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await privacyPolicy.findById(ID);
    let PolicyCount = Check.length;
    if (!Check) {
      res.status(404).json({ message: "Policy Not Found" });
    }
    Check = await privacyPolicy.findByIdAndUpdate(Check._id, req.body, {
      new: true,
    });

    res.json({
      totalPolicy: PolicyCount,
      Policys: Check,
      message: "privacyPolicy updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removePolicyById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await privacyPolicy.findById(ID);
    if (!Check) {
      res.status(404).json({ message: "Policy Not Found" });
    }
    Check = await privacyPolicy.findByIdAndDelete(Check._id);

    res.json({ message: "privacyPolicy Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPolicy,
  getAllPolicy,
  getPolicyById,
  updatePolicyById,
  removePolicyById,
};
