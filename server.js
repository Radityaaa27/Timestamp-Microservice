const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Homepage route
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let date;
  
  // Handle empty date parameter
  if (!req.params.date) {
    date = new Date();
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // Check if it's a Unix timestamp (numeric string)
  if (/^\d+$/.test(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Successful response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});