// Import required packages
import express from 'express';
import { createClient } from '@supabase/supabase-js';

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Supabase client with your credentials
const supabase = createClient(
  'https://qpuueujcdwtbvgsclyni.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXVldWpjZHd0YnZnc2NseW5pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDczNTA1NSwiZXhwIjoyMDgwMzExMDU1fQ.1zljuoCUoCrrovQOgp-Q-PKV2lYBl8pOp82ZOV3e7lg'
);

// Webhook endpoint to receive data from Apify
app.post('/apify-webhook', async (req, res) => {
  try {
    // Get the JSON data sent from Apify
    const videoData = req.body;

    // Insert the data into the tiktok_videos table in Supabase
    const { data, error } = await supabase
      .from('tiktok_videos')
      .insert(videoData);

    // Check if there was an error during insertion
    if (error) {
      console.error('Error inserting data into Supabase:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    // Success response
    console.log('Data successfully inserted:', data);
    res.status(200).json({ success: true, message: 'Data inserted successfully' });

  } catch (err) {
    // Handle any unexpected errors
    console.error('Unexpected error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Webhook server is running on http://localhost:${PORT}`);
  console.log(`Ready to receive data at http://localhost:${PORT}/apify-webhook`);
});
