require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const symptomCheckerApi = require('./api/symptom-checker');

const googleAuthApi = require('./api/google-auth');
const googleMeetApi = require('./api/google-meet');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Mount API route
app.use('/api/symptom-checker', symptomCheckerApi);

// Mount Google OAuth route
app.use('/', googleAuthApi);

// Mount Google Meet API route
app.use('/api', googleMeetApi);

// Example: other routes
// app.use('/api/other', require('./api/other'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
