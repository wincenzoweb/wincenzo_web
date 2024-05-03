const ORG = require("../models/org");

const addOrg = async (req, res) => {
  try {
    const existorg = await ORG.find();

    if (existorg?.length !== 0) {
      throw new Error("Orgnization data Are Already Exist");
    }

    let check = await ORG.create(req.body);

    res.json({
      org: check,
      message: "Orgnization data Is Created Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrg = async (req, res) => {
  try {
    let Check = await ORG.find();
    let OrgCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: "Orgnization data Not Found" });
    }
    res.json({
      totalOrg: OrgCount,
      org: Check,
      message: "All Org Data Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrgById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await ORG.findById(ID);
    let OrgCount = Check.length;

    if (!Check) {
      res.status(404).json({ message: "Orgnization Data Not Found" });
    }
    res.json({
      totalOrg: OrgCount,
      org: Check,
      message: "Orgnization Data Found",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrgById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await ORG.findById(ID);
    let OrgCount = Check.length;
    if (!Check) {
      res.status(404).json({ message: "Orgnization Not Found" });
    }
    Check = await ORG.findByIdAndUpdate(Check._id, req.body, {
      new: true,
    });

    res.json({
      totalOrg: OrgCount,
      org: Check,
      message: "Orgnization updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeOrgById = async (req, res) => {
  try {
    let ID = req.params.id;
    let Check = await ORG.findById(ID);
    if (!Check) {
      res.status(404).json({ message: "Orgnization data Not Found" });
    }
    Check = await ORG.findByIdAndDelete(Check._id);

    res.json({ message: "Orgnization data Removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrg,
  getAllOrg,
  getOrgById,
  updateOrgById,
  removeOrgById,
};
