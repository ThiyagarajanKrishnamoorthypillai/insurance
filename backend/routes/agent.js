const {Agent} = require('../models/agent');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const agentList = await Agent.find().select('-passwordHash');
    if(!agentList) {
        res.status(500).json({success: false})
    } 
    res.send(agentList);
})

router.get(`/:id`, async (req, res) =>{
    const agentList = await Agent.findById(req.params.id);

    if(!agentList) {
        res.status(500).json({success: false})
    } 
    res.send(agentList);
})


router.post(`/`, async (req, res) =>{
    let agent = new Agent({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        mobile: req.body.mobile,
        location: req.body.location,
        })
    agent = await agent.save();
    if(!agent) 
    return res.status(500).send('The agent cannot be created')

    res.send(agent);
})

router.post('/login', async (req, res) => {
  const agent = await Agent.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!agent) return res.status(400).send('The agent not found');

  if (bcrypt.compareSync(req.body.password, agent.passwordHash)) {
    const token = jwt.sign(
      {
        agentemail: agent.email,
        location: agent.location,
        mobile1:agent.mobile,
      },
      secret,
      { expiresIn: '1d' }
    );

    // ✅ Set cookies
    res.cookie('agentemail', agent.email, {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 86400000,
    });

    res.cookie('location', agent.location, {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 86400000,
    });
    res.cookie('mobile1', agent.mobile, {
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 86400000,
    });
    

    // ✅ Response for frontend
    res.status(200).send({
      token,
      agent: agent.email,
      agentLocation: agent.location,
      mobile1:agent.mobile,
      
    });
  } else {
    res.status(400).send('Password is wrong!');
  }
});




router.put('/:id',async (req, res)=> {

    const agentExist = await Agent.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = agentExist.passwordHash;
    }

    const agent = await Agent.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            mobile: req.body.mobile,
            location: req.body.location,
            
            
        },
        { new: true}
    )

    if(!agent)
    return res.status(400).send('the agent cannot be created!')

    res.send(agent);
})

router.delete('/:id', async (req, res) => {
    try {
        const agent = await Agent.findByIdAndRemove(req.params.id);
        if (!agent) {
            return res.status(404).send('Agent not found');
        }
        res.send('Agent removed successfully');
    } catch (error) {
        console.error('Error removing agent:', error.message);
        res.status(500).send('Internal server error');
    }
});


module.exports =router;