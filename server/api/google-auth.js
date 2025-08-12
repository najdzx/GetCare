const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const cors = require('cors');

// Use environment variables for credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = 'http://localhost:5000/auth/google/callback';

// Scopes required for passport-google-oauth20 and calendar events
const SCOPES = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/calendar.events'
];

// Debug logging for credentials and scope
console.log('GOOGLE_CLIENT_ID:', CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', CLIENT_SECRET ? 'Loaded' : 'Missing');
console.log('SCOPES:', SCOPES);

// Session setup
router.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

router.use(session({
  secret: 'getcare_secret',
  resave: false,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    // Save tokens and profile in session
    return done(null, { profile, accessToken, refreshToken });
  }
));

// Auth routes
router.get('/auth/google', (req, res, next) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  console.log('CLIENT_ID check:', clientId);
  console.log('CLIENT_SECRET check:', clientSecret ? 'Present' : 'Missing');
  
  if (!clientId || !clientSecret) {
    return res.status(500).send('Google OAuth credentials missing');
  }
  
  return passport.authenticate('google', { 
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.events']
  })(req, res, next);
});

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Send a response that closes the popup window and notifies the parent
  res.send(`
    <html>
      <body>
        <script>
          // Close the popup and notify parent window
          if (window.opener) {
            window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, 'http://localhost:5173');
            window.close();
          } else {
            // Fallback if not in popup
            document.body.innerHTML = '<h2>✅ Google authentication successful!</h2><p>You can now close this window and return to your appointment booking.</p>';
          }
        </script>
        <h2>✅ Authentication successful!</h2>
        <p>This window will close automatically...</p>
      </body>
    </html>
  `);
});

// Simple endpoint to check if user is authenticated with Google
router.get('/auth/status', (req, res) => {
  const isAuthed = !!(req.user && req.user.accessToken);
  const email = req.user?.profile?.emails?.[0]?.value || null;
  const name = req.user?.profile?.displayName || null;
  res.json({ authenticated: isAuthed, email, name });
});

module.exports = router;
