const { Plan } = require('../models/plan');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');
const path = require('path');

// Multer setup (if needed for future file uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET all plans
router.get(`/`, async (req, res) => {
  const planList = await Plan.find();
  if (!planList) return res.status(500).json({ success: false });
  res.status(200).send(planList);
});

// GET by ID
router.get(`/:id`, async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) return res.status(500).json({ success: false });
  res.status(200).send(plan);
});

// ✅ UPDATED POST: Create new plan
router.post('/', auth, async (req, res) => {
  try {
    const {
      adminemail,
      planName,
      type,
      coverage,
      exclusions,
      premium,
      validity,
      eligibility,
      addOns,
      vehicleType,
      isActive
    } = req.body;

    const plan = new Plan({
      adminemail,
      planName,
      type,
      coverage,
      exclusions,
      premium,
      validity,
      eligibility,
      addOns: addOns.split(',').map(s => s.trim()), // if comma-separated string
      vehicleType,
      isActive
    });

    const savedPlan = await plan.save();
    res.status(201).send(savedPlan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT: Update plan
router.put('/:id', async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(
    req.params.id,
    {
      adminemail: req.body.adminemail,
      planName: req.body.planName,
      type: req.body.type,
      coverage: req.body.coverage,
      exclusions: req.body.exclusions,
      premium: req.body.premium,
      validity: req.body.validity,
      eligibility: req.body.eligibility,
      addOns: Array.isArray(req.body.addOns)
  ? req.body.addOns
  : req.body.addOns.split(',').map(s => s.trim()),

      vehicleType: req.body.vehicleType,
      isActive: req.body.isActive
    },
    { new: true }
  );

  if (!plan) return res.status(400).send('The plan cannot be updated!');
  res.send(plan);
});

// DELETE plan
router.delete('/:id', auth, (req, res) => {
  Plan.findByIdAndRemove(req.params.id)
    .then(plan => {
      if (plan) {
        return res.status(200).json({ success: true, message: 'The plan is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: 'Plan not found!' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
