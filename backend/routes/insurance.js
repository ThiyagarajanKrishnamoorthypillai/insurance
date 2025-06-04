const {Insurance} = require('../models/insurance');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../helpers/cloudinary');

// Cloudinary multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'insurance',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });




router.get(`/`,  async (req, res) =>{
    const insuranceList = await Insurance.find();

    if(!insuranceList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(insuranceList);
})



router.get(`/:id`, async (req, res) =>{
    const insuranceList = await Insurance.findById(req.params.id);

    if(!insuranceList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(insuranceList);
})


router.post('/', upload.array('vehiclePhotos', 10), async (req, res) => {
  try {
const photoPaths = req.files ? req.files.map(f => f.path) : [];

    // Generate new policy number
    const lastPolicy = await Insurance.findOne().sort({ policyNumber: -1 }).exec();
    let newPolicyNumber = "POL0000321";
    if (lastPolicy && lastPolicy.policyNumber) {
      const lastNum = parseInt(lastPolicy.policyNumber.replace("POL", ""), 10);
      const nextNum = lastNum + 1;
      newPolicyNumber = `POL${nextNum.toString().padStart(7, '0')}`;
    }

    const insurance = new Insurance({
      planName: req.body.planName,
      type: req.body.type,
      coverage: req.body.coverage,
      exclusions: req.body.exclusions,
      premium: req.body.premium,
      validity: req.body.validity,
      eligibility: req.body.eligibility,
      addOns: JSON.parse(req.body.addOns || '[]'),
      vehicleType: req.body.vehicleType,

      name: req.body.name,
      email: req.body.email,
      vehicleNo: req.body.vehicleNo,
      address: req.body.address,
      mobile: req.body.mobile,
      location: req.body.location,
      vehiclePhotos: photoPaths,

      policyNumber: newPolicyNumber,
      status: 'Pending',
      planDateCreated: req.body.planDateCreated,
      insuranceDateCreated: req.body.insuranceDateCreated || new Date(),
    });

    const savedInsurance = await insurance.save();

    // ✅ return full object with policyNumber
    res.status(201).json(savedInsurance);

  } catch (error) {
    console.error("Error saving insurance:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Update insurance status + set agentemail and location
router.put('/status/:id', async (req, res) => {
  try {
    const insuranceId = req.params.id;
    const { status, agentemail, location, mobile1 } = req.body;

    const updated = await Insurance.findByIdAndUpdate(
      insuranceId,
      {
        status,
        agentemail,
        location, mobile1,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Insurance entry not found" });
    }

    res.status(200).json({ message: "Status updated successfully", insurance: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put('/:id',async (req, res)=> {
    const insurance = await Insurance.findByIdAndUpdate(
        req.params.id,
        {  
           
            name: req.body.name
        },
        { new: true}
    )

    if(!insurance)
    return res.status(400).send('the insurance cannot be updated!')

    res.send(insurance);
})



router.delete('/:id', auth, (req, res)=>{
    Insurance.findByIdAndRemove(req.params.id).then(insurance =>{
        if(insurance) {
            return res.status(200).json({success: true, message: 'the insurance is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "insurance not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})




module.exports =router;