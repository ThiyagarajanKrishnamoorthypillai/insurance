const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser');


const fs = require('fs').promises;
const path = require('path');
const configPath = path.resolve(__dirname,    'helpers', 'config.json');

const machineId = require('node-machine-id');
let machineID; // Declare machineID variable
let license ="u3Y65£,;7Y#I";

// Get the machine ID
machineId.machineId()
  .then(id => {
    machineID = id;
    //console.log('Machine ID:', id);
    //console.log('license ID:', license);
  })
  .catch(error => {
    console.error('Error getting machine ID:', error);
  });

  

let isLicenseValid = false;


const validateLicense = async () => {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    const storedLicense = config.license;
    machineID = await machineId.machineId();

    if (
      storedLicense.licenseCode === license &&
      storedLicense.deviceId === machineID
    ) {
      console.log('✅ License is valid.');
      isLicenseValid = true;
    } else {
      console.error('❌ Invalid license or device ID');
    }
  } catch (err) {
    console.error('❌ License check error:', err.message);
  }
};

validateLicense(); // Run async without blocking

// This middleware will block protected routes if license is invalid
app.use((req, res, next) => {
  if (!isLicenseValid) {
    return res.status(403).json({ message: 'License validation failed' });
  }
  next();
});





require('dotenv/config');
app.use(cors({
  origin: 'https://vehicle-insurance-cloud.vercel.app', // ✅ Allow frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // ✅ Allow cookies/headers if needed
}));
app.options('*', cors())

//middleware
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan('tiny'));


//"email": "john.doe@example.com",
//"password": "yourpassword"



//Routes

const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');
const locationRoutes = require('./routes/location');
const planRoutes = require('./routes/plan');
const insuranceRoutes = require('./routes/insurance');
const claimRoutes = require('./routes/claim');



const api = process.env.API_URL;


// route call 

app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/agent`, agentRoutes);
app.use(`${api}/location`, locationRoutes);
app.use(`${api}/plan`, planRoutes);
app.use(`${api}/insurance`, insuranceRoutes);
app.use(`${api}/claim`, claimRoutes);

// Static folders
///app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // ✅ for images
//app.use('/public', express.static(path.join(__dirname, 'public'))); // already exists


//CONNECTION_STRING = 'mongodb://localhost:27017/';
//  http://localhost:4000/api/v1/business/


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Add this line
    dbName: 'insurance'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
