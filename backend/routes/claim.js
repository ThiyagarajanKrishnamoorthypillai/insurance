const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Claim = require('../models/claim');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../helpers/cloudinary');

// Cloudinary multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'claims',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// @route   POST /api/v1/claim
// @desc    Create a new claim with multiple photos
router.post('/', upload.array('photo[]', 10), async (req, res) => {
  try {
    const {
      policyNumber, planName, name, email, mobile, vehicleNo,
      coverage, exclusions, eligibility, validity, location, agentemail,
      mobile1, typeOfDamage, dateOfIncident, status, claimDateCreated
    } = req.body;

const photoPaths = req.files.map(file => file.path); // This will be Cloudinary URLs

    const newClaim = new Claim({
      policyNumber, planName, name, email, mobile, vehicleNo,
      coverage, exclusions, eligibility, validity, location, agentemail,
      mobile1, typeOfDamage, dateOfIncident,
      status: status || 'Pending',
      claimDateCreated: claimDateCreated || new Date().toISOString().split('T')[0],
      photo: photoPaths
    });

    await newClaim.save();
    res.status(201).json({ message: 'Claim submitted successfully', claim: newClaim });
  } catch (err) {
    console.error('Error creating claim:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// === GET: All Claims (Admin or testing purpose) ===
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    console.error('Error fetching claims:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// === GET: Claims by Email ===
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const claims = await Claim.find({ email }).sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// PATCH /api/v1/claim/:id
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Claim.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update claim status" });
  }
});


module.exports = router;
