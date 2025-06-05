const express = require('express');
const app = express();
// ... all other requires ...

const path = require('path');
const fs = require('fs').promises;
const machineId = require('node-machine-id');
const configPath = path.resolve(__dirname, 'helpers', 'config.json');

require('dotenv/config');

// ✅ CORS Setup
const cors = require('cors');
const allowedOrigins = [
  'https://vehicle-insurance-cloud.vercel.app',
  'http://localhost:3000'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.options('*', cors()); // Preflight handler

// ✅ Body Parsers and Logger
app.use(express.json());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('morgan')('tiny'));

// ✅ MongoDB Connect
const mongoose = require('mongoose');
mongoose.pluralize(null);
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: 'insurance'
}).then(() => console.log('✅ Database connected'))
  .catch(err => {
    console.error('❌ DB Connection Failed:', err);
    process.exit(1);
  });

// ✅ License + Machine ID validation BEFORE starting server
const license = "u3Y65£,;7Y#I";

machineId.machineId().then(async (machineID) => {
  const configData = await fs.readFile(configPath, 'utf-8');
  const storedLicense = JSON.parse(configData).license;

  if (storedLicense.licenseCode === license && storedLicense.deviceId === machineID) {
    console.log('✅ License validated');

    // ✅ Add license middleware for future requests
    app.use((req, res, next) => next());

    // ✅ Define Routes
    const api = process.env.API_URL || '/api/v1';
    app.use(`${api}/feedback`, require('./routes/feedback'));
    app.use(`${api}/user`, require('./routes/user'));
    app.use(`${api}/admin`, require('./routes/admin'));
    app.use(`${api}/agent`, require('./routes/agent'));
    app.use(`${api}/location`, require('./routes/location'));
    app.use(`${api}/plan`, require('./routes/plan'));
    app.use(`${api}/insurance`, require('./routes/insurance'));
    app.use(`${api}/claim`, require('./routes/claim'));

    // ✅ Start server
    const port = process.env.PORT || 4000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });

  } else {
    console.error('❌ Invalid license');
    process.exit(1);
  }
}).catch(err => {
  console.error('❌ Failed to get machine ID or license config:', err.message);
  process.exit(1);
});
