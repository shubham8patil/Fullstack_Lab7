// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const hospitalsRouter = require('./routes/hospitals');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({ origin: true }));


app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


app.use('/api/hospitals', hospitalsRouter);

// Basic root API info
app.get('/api', (req, res) => {
  res.json({
    message: 'Hospital Management API',
    endpoints: ['/api/hospitals', '/api/hospitals/:id']
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
