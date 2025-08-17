const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

// Create Google Meet link by creating a calendar event
router.post('/create-meet-link', async (req, res) => {
  try {
    if (!req.user || !req.user.accessToken) {
      return res.status(401).json({ error: 'User not authenticated with Google' });
    }

  const { title, startTime, endTime, description, timeZone, attendees } = req.body;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const tz = timeZone || 'UTC';
    // Ensure the authenticated Google user is in the attendee list
    const authedEmail = req.user?.profile?.emails?.[0]?.value;
    const baseAttendees = Array.isArray(attendees) ? attendees.filter(a => a && a.email) : [];
    const uniqueAttendees = [...baseAttendees];
    if (authedEmail && !baseAttendees.find(a => a.email?.toLowerCase() === authedEmail.toLowerCase())) {
      uniqueAttendees.push({ email: authedEmail });
    }

    const event = {
      summary: (typeof title === 'string' && title.trim()) || 'Medical Appointment',
      description: (typeof description === 'string' && description.trim()) || 'Appointment via GetCare platform',
      start: { dateTime: startTime, timeZone: tz },
      end: { dateTime: endTime, timeZone: tz },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      attendees: uniqueAttendees,
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    const meetLink = response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === 'video'
    )?.uri;

    res.json({
      success: true,
      eventId: response.data.id,
      meetLink,
      eventLink: response.data.htmlLink,
      message: 'Google Meet link created successfully',
    });
  } catch (error) {
    console.error('Error creating Google Meet link:', error);
    res.status(500).json({ error: 'Failed to create Google Meet link', details: error.message });
  }
});

// Update an existing Google Calendar event's time (Meet link remains the same)
router.post('/update-meet-event', async (req, res) => {
  try {
    if (!req.user || !req.user.accessToken) {
      return res.status(401).json({ error: 'User not authenticated with Google' });
    }

  const { eventId, startTime, endTime, title, description, timeZone } = req.body;
    if (!eventId || !startTime || !endTime) {
      return res.status(400).json({ error: 'eventId, startTime and endTime are required' });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const tz = timeZone || 'UTC';
  const patch = {
      start: { dateTime: startTime, timeZone: tz },
      end: { dateTime: endTime, timeZone: tz },
    };
    if (typeof title === 'string' && title.trim().length > 0) {
      patch.summary = title.trim();
    }
    if (typeof description === 'string' && description.trim().length > 0) {
      patch.description = description.trim();
    }

    const response = await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      resource: patch,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    const meetLink = response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === 'video'
    )?.uri;

    res.json({
      success: true,
      eventId: response.data.id,
      meetLink,
      eventLink: response.data.htmlLink,
      message: 'Event updated successfully',
    });
  } catch (error) {
    console.error('Error updating Google Meet event:', error);
    res.status(500).json({ error: 'Failed to update event', details: error.message });
  }
});

module.exports = router;
