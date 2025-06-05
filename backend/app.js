const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

// ✅ CORS Configuration
const allowedOrigins = [
  'https://vehicle-insurance-cloud.vercel.app', // Your Vercel frontend
  'http://localhost:3000' // Local testing
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
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// ✅ TEMPORARY BYPASS: License Check Disabled
console.log('⚠️ License check disabled for deployment testing');

// ✅ MongoDB Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: 'insurance'
})
.then(() => {
  console.log('✅ Database Connection is ready...');
})
.catch((err) => {
  console.error('❌ DB Connection failed:', err);
  process.exit(1);
});

// ✅ Routes
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');
const locationRoutes = require('./routes/location');
const planRoutes = require('./routes/plan');
const insuranceRoutes = require('./routes/insurance');
const claimRoutes = require('./routes/claim');

const api = process.env.API_URL || "/api/v1";

app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/agent`, agentRoutes);
app.use(`${api}/location`, locationRoutes);
app.use(`${api}/plan`, planRoutes);
app.use(`${api}/insurance`, insuranceRoutes);
app.use(`${api}/claim`, claimRoutes);

// ✅ Server Start
const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
