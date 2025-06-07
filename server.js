const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Endpoint tanpa parameter
app.get("/api", (req, res) => {
    const date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  });
  
  // Endpoint dengan parameter
  app.get("/api/:date", (req, res) => {
    let date;
    
    // Check if it's a Unix timestamp (number)
    const unixTimestamp = parseInt(req.params.date);
    if (!isNaN(unixTimestamp)) {
      date = new Date(unixTimestamp);
    } else {
      date = new Date(req.params.date);
    }
    
    // Check if date is invalid
    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  });

// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});