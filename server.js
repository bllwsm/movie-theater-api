const express = require('express');
const app = express();
const port = 3000;

// Define your routes and middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;