const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5000/chat', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error connecting to the Flask server.');
  }
});
app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`);
});
