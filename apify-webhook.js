import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

// --- Supabase setup ---
const supabaseUrl = "https://qpuueujcdwtbvgsclyni.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdXVldWpjZHd0YnZnc2NseW5pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDczNTA1NSwiZXhwIjoyMDgwMzExMDU1fQ.1zljuoCUoCrrovQOgp-Q-PKV2lYBl8pOp82ZOV3e7lg";

const supabase = createClient(supabaseUrl, serviceRoleKey);

// --- Webhook route ---
app.post("/apify-webhook", async (req, res) => {
  try {
    const data = req.body; // Apify sends TikTok data here

    const { error } = await supabase
      .from("tiktok_videos")
      .insert(data); // Save data to your table

    if (error) throw error;

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Webhook running on port ${PORT}`));
