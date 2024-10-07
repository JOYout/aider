const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/save', (req, res) => {
  const content = req.body.content;
  const filePath = path.join(__dirname, 'index.html');

  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving content');
    } else {
      res.send('Content saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
